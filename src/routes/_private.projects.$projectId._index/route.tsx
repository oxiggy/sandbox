import type { Route } from "./+types/route";
import { useProjectSelector } from "@/contexts/project";

export default function ProjectHome(props: Route.ComponentProps) {
  const project = useProjectSelector();

  return (
    <div>
      <h1>Project here</h1>

      <div>
        <div>Name: {project.name}</div>
        <div>Description: {project.description}</div>
      </div>

      <div>
        <h2>Tasks</h2>

        {project.tasks.map((task) => (
          <li key={task.$jazz.id}>{task.name}</li>
        ))}
      </div>
    </div>
  );
}
