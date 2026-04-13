import type { Route } from "./+types/route";
import { Welcome } from "@/welcome/welcome";
import { useAccountSelector } from "@/contexts/account";
import { ProjectSchema } from "@/schema";

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
    account.root.projects.$jazz.push(
      ProjectSchema.create({
        name: "test",
        description: "lol",
      }),
    );
  };
  const handleDeleteProject = (id: string) => {
    account.root.projects.$jazz.remove((item) => item.$jazz.id === id);
  };

  return (
    <div>
      <button onClick={handleAddProject}>Add project</button>
      <ul>
        {account.root.projects.map((project) => (
          <li className="flex gap-2" key={project.$jazz.id}>
            <p>
              <span>{project.name}</span> <span>{project.$jazz.id}</span>
            </p>
            <button onClick={() => handleDeleteProject(project.$jazz.id)}>
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
