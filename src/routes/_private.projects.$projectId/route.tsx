import type { Route } from "./+types/route";
import { ProjectProvider } from "@/contexts/project";
import { Outlet } from "react-router";

export default function Project(props: Route.ComponentProps) {
  const {
    params: { projectId },
  } = props;

  return (
    <ProjectProvider
      id={projectId}
      loadingFallback={<div>loading...</div>}
      unavailableFallback={<div>unavailable...</div>}
    >
      <Outlet />
    </ProjectProvider>
  );
}
