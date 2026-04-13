import { useAccountSelector } from "@/contexts/account";
import { ProjectSchema } from "@/schema";
import { useAcceptInvite } from "jazz-tools/react";
import { useNavigate } from "react-router";

export default function Invite() {
  const account = useAccountSelector();
  const navigate = useNavigate();

  useAcceptInvite({
    invitedObjectSchema: ProjectSchema,

    onAccept: async (projectId) => {
      const project = await ProjectSchema.load(projectId);
      if (!project.$isLoaded) throw new Error("Project could not be loaded");
      //account.root.projects.$jazz.push(project);
      navigate(`/projects/${projectId}`);
    },
  });

  return null;
}
