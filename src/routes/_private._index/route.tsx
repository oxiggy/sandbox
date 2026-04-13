import { NavLink } from "react-router";
import type { Route } from "./+types/route";
import { useAccountSelector } from "@/contexts/account";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Project" },
    { name: "description", content: "Welcome to AppApp!" },
  ];
}

export default function Home() {
  const account = useAccountSelector();
  console.log("acc", account);
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
              className="size-6 bg-red-400"
              onClick={() => handleDeleteProject(project.$jazz.id)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
