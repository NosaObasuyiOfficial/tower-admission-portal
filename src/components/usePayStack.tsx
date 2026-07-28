/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { apiClient } from "../service/apiClient";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

interface UsePaystackProps {
  email: string;
  fullName: string;
  onSuccess: (reference: string) => void;
  onClose?: () => void;
}

export function usePaystack({
  email,
  fullName,
  onSuccess,
  onClose,
}: UsePaystackProps) {
  useEffect(() => {
    if (document.getElementById("paystack-script")) return;

    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.id = "paystack-script";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  const verifyPayment = async (reference: string) => {
    try {
      const res: any = await apiClient.get(
        `/portal/payments/verify/${reference}`,
      );

      const result = res.data;

      if (!result.success) {
        alert("Payment verification failed.");
        return;
      }

      onSuccess(reference);
    } catch (err) {
      console.error(err);
    }
  };

  const initializePayment = async () => {
    try {
      const res: any = await apiClient.post("/portal/payments/initialize", {
        email,
        fullName,
      });

      const payment = res.data;

      if (res.status !== 200) {
        throw new Error("Unable to initialize payment");
      }

      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY!,
        access_code: payment.access_code,
        email,
        amount: payment.amount,
        firstname: fullName.split(" ")[0],
        lastname: fullName.split(" ").slice(1).join(" "),
        ref: payment.reference,
        currency: "NGN",

        callback: function (response: any) {
          verifyPayment(response.reference);
        },

        onClose: () => {
          onClose?.();
        },
      });

      handler.openIframe();
    } catch (err) {
      console.error(err);
    }
  };

  return { initializePayment };
}
