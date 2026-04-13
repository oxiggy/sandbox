import { NavLink } from "react-router";
import type { Route } from "./+types/route";
import { useAccountSelector } from "@/contexts/account";
import { XIcon } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Project" },
    { name: "description", content: "Welcome to AppApp!" },
  ];
}

export default function Home() {
  const account = useAccountSelector();

  const handleAddProject = () => {
    account.root.projects.$jazz.push({
      name: "test",
      description: "lol",
      tasks: [],
    });
  };
  const handleDeleteProject = (id: string) => {
    account.root.projects.$jazz.remove((item) => item.$jazz.id === id);
  };

  return (
    <div>
      <div>
        <button onClick={handleAddProject}>Add project</button>
      </div>

      <ul>
        {account.root.projects.map((project) => (
          <li className="flex gap-4" key={project.$jazz.id}>
            <NavLink to={`projects/${project.$jazz.id}`}>
              <p>
                <span>{project.name}</span>{" "}
                <span className="text-xs">{project.$jazz.id}</span>
              </p>
            </NavLink>
            <button
              className="app-btn-icon app-btn-error"
              onClick={() => handleDeleteProject(project.$jazz.id)}
            >
              <XIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
