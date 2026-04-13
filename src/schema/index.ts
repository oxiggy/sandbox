import { co, z } from "jazz-tools";

export const TaskSchema = co
  .map({
    name: z.string(),
  })
  .withPermissions({
    onInlineCreate: "sameAsContainer",
  });

export const ProjectSchema = co
  .map({
    name: z.string(),
    description: z.string().optional(),
    tasks: co.list(TaskSchema),
  })
  .withPermissions({
    onInlineCreate: "extendsContainer",
  })
  .withMigration((project) => {
    if (!project.$jazz.has("tasks")) {
      project.$jazz.set("tasks", []);
    }
  });

export const ContactSchema = co
  .map({
    name: z.string(),
    comment: z.string().optional(),
    get account() {
      return AccountSchema;
    },
  })
  .withPermissions({
    onInlineCreate: "sameAsContainer",
  });

export const AccountRootSchema = co.map({
  contacts: co.list(ContactSchema),
  projects: co.list(ProjectSchema),
});

export const AccountProfileSchema = co.profile({
  name: z.string(),
});

export const AccountSchema = co
  .account({
    profile: AccountProfileSchema,
    root: AccountRootSchema,
  })
  .withMigration((account) => {
    if (!account.$jazz.has("root")) {
      account.$jazz.set("root", {
        contacts: [],
        projects: [],
      });
    }
  });
