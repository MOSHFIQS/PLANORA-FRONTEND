"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PaymentRefreshHandler = () => {
     const router = useRouter();
     const params = useSearchParams();

     useEffect(() => {
          if (params.get("payment") === "success") {

               router.replace("/dashboard/participate");
               router.refresh();
          }
     }, [params, router]);

     return null;
};

export default PaymentRefreshHandler;