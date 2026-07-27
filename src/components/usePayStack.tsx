/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

interface UsePaystackProps {
  email: string;
  amount: number;
  fullName: string;
  onSuccess: (reference: string) => void;
  onClose?: () => void;
}

export function usePaystack({
  email,
  amount,
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

  const initializePayment = () => {
    if (!window.PaystackPop) {
      alert("Paystack failed to load.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY || "pk_test_6beb413cae462d031df1a37a8e899c9fcc3f7142",
      email,
      amount,
      firstname: fullName.split(" ")[0],
      lastname: fullName.split(" ").slice(1).join(" "),
      ref: `TPA-${Date.now()}`,
      currency: "NGN",

      callback: (response: any) => {
        onSuccess(response.reference);
      },

      onClose: () => {
        onClose?.();
      },
    });

    handler.openIframe();
  };

  return { initializePayment };
}