import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import db from "@/lib/db";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { polarClient } from "@/module/payment/config/polar";
import prisma from "@/lib/db";
import { updatePolarCustomerId, updateUserTier } from "@/module/payment/lib/subscription";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

  trustedOrigins: [
    "http://localhost:3000",
    "https://outburst-grouped-dimple.ngrok-free.dev",
  ],

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      scope: ["repo"],
    },
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "2e61124e-c7b7-4b42-baf4-a091ad85c5e3",
              slug: "Codereview" // Custom slug for easy reference in Checkout URL, e.g. /checkout/CodeOrbit
            }
          ],
          successUrl: process.env.POLAR_SUCCESS_URL,
          authenticatedUsersOnly: true
        }),
        portal({
          returnUrl: process.env.NEXT_PUBLIC_APP_BASE_URL
        }),
        usage(),
        webhooks({
          secret: process.env.POLAR_WEBHOOK_SECRET!,

          onSubscriptionActive: async (payload) => {
            const customerId =
              payload.data.customerId;

            const user =
              await prisma.user.findUnique({
                where: {
                  polarCustomerId: customerId,
                },
              });

            if (user) {
              await updateUserTier(
                user.id,
                "PRO",
                "ACTIVE",
                payload.data.id
              );
            }
          },
          onSubscriptionCanceled: async (payload) => {
            const customerId =
              payload.data.customerId;

            const user =
              await prisma.user.findUnique({
                where: {
                  polarCustomerId: customerId,
                },
              });

            if (user) {
              await updateUserTier(
                user.id,
                user.subscriptionTier as any,
                "CANCELED"
              );
            }
          },
          onSubscriptionRevoked: async (payload) => {
            const customerId =
              payload.data.customerId;

            const user =
              await prisma.user.findUnique({
                where: {
                  polarCustomerId: customerId,
                },
              });

            if (user) {
              await updateUserTier(
                user.id,
                "FREE",
                "EXPIRED"
              );
            }
          },
          onOrderPaid: async () => { },
          onCustomerCreated: async (payload) => {
            const user =
              await prisma.user.findUnique({
                where: {
                  email: payload.data.email!,
                },
              });

            if (user) {
              await updatePolarCustomerId(
                user.id,
                payload.data.id
              );
            }
          },
        })
  ],
})
  ]
});