"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  ExternalLink,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { getReviews } from "@/module/review/actions";
import { formatDistanceToNow } from "date-fns";

export default function ReviewsPage() {
  const {
    data: reviews,
    isLoading,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      return await getReviews();
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Reviews
          </h1>

          <p className="text-muted-foreground">
            Manage and track your code reviews.
          </p>
        </div>

        <div className="flex min-h-[500px] items-center justify-center rounded-xl border">
          <p className="text-muted-foreground">
            Loading reviews...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Reviews
        </h1>

        <p className="text-muted-foreground">
          Manage and track your code reviews.
        </p>
      </div>

      {!reviews?.length ? (
        <div className="flex min-h-[500px] items-center justify-center rounded-xl border">
          <p className="text-muted-foreground">
            No active reviews found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review: any) => (
            <Card
              key={review.id}
              className="transition-all hover:border-primary/30"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">
                        {review.prTitle}
                      </CardTitle>

                      {review.status ===
                        "completed" && (
                        <Badge
                          className="
                            border-blue-500/20
                            bg-blue-500/15
                            text-blue-400
                            hover:bg-blue-500/20
                          "
                        >
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Completed
                        </Badge>
                      )}

                      {review.status ===
                        "failed" && (
                        <Badge
                          className="
                            border-red-500/20
                            bg-red-500/15
                            text-red-400
                            hover:bg-red-500/20
                          "
                        >
                          <XCircle className="mr-1 h-3 w-3" />
                          Failed
                        </Badge>
                      )}

                      {review.status ===
                        "pending" && (
                        <Badge
                          variant="secondary"
                        >
                          <Clock className="mr-1 h-3 w-3" />
                          Pending
                        </Badge>
                      )}
                    </div>

                    <CardDescription>
                      {
                        review.repository
                          .fullName
                      }{" "}
                      • PR #
                      {review.prNumber}
                    </CardDescription>

                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(
                        new Date(
                          review.createdAt
                        ),
                        {
                          addSuffix: true,
                        }
                      )}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                  >
                    <a
                      href={review.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border bg-muted/30 p-4">
                    <p className="line-clamp-6 whitespace-pre-wrap text-sm text-muted-foreground">
                      {review.review}
                    </p>
                  </div>

                  <Button
                    asChild
                    variant="outline"
                  >
                    <a
                      href={review.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Full Review on
                      GitHub
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}