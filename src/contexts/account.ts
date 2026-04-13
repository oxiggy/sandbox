import { createAccountSubscriptionContext } from "jazz-tools/react";
import { AccountSchema } from "@/schema";

export const { Provider: AccountProvider, useSelector: useAccountSelector } =
  createAccountSubscriptionContext(AccountSchema, {
    profile: true,

    root: {
      projects: { $each: true },
    },
  });
