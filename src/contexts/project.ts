import { createCoValueSubscriptionContext } from "jazz-tools/react";
import { ProjectSchema } from "@/schema";

export const { Provider: ProjectProvider, useSelector: useProjectSelector } =
  createCoValueSubscriptionContext(ProjectSchema, {
    tasks: {
      $each: true,
    },
  });
