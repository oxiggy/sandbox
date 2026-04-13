import { co, z } from "jazz-tools";

export const ProjectSchema = co.map({
  name: z.string(),
  description: z.string().optional(),
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
