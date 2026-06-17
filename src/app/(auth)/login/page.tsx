// import React from 'react';
// export const dynamic = "force-dynamic";
// import LoginUI from '@/module/auth/components/login-ui'; 
// import { requireUnAuth } from '@/module/auth/utils/auth-utils';

// const Page = async() => {
//   await requireUnAuth();
//   return (
//     <>
//       <LoginUI/>
//     </>
//   );
// };

// export default Page;

import LoginUI from "@/module/auth/components/login-ui";

export const dynamic = "force-dynamic";

export default function Page() {
  return <LoginUI />;
}