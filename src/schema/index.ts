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

export const AccountRootSchema = co.map({
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
        projects: [],
      });
    }
  });
