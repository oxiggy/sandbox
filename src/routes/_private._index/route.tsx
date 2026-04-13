import { NavLink } from "react-router";
import type { Route } from "./+types/route";
import { useAccountSelector } from "@/contexts/account";
import { XIcon } from "lucide-react";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Project" },
    { name: "description", content: "Welcome to AppApp!" },
  ];
}

export default function Home() {
  const account = useAccountSelector();
  const [newProjectName, setNewProjectName] = useState("");

  const handleAddProject = () => {
    const name = newProjectName.trim();
    if (!name) return;

    account.root.projects.$jazz.push({
      name,
      description: new Date().toISOString(),
      tasks: [],
    });

    setNewProjectName("");
  };
  const handleDeleteProject = (id: string) => {
    account.root.projects.$jazz.remove((item) => item.$jazz.id === id);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex gap-4">
        <input
          className="border rounded px-2 py-1"
          placeholder="Project name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddProject();
            }
          }}
        />
        <button className="app-btn app-btn-neutral" onClick={handleAddProject}>
          Add project
        </button>
      </div>

      <ul className="space-y-4">
        {account.root.projects.map((project) => (
          <li className="flex gap-4 items-center" key={project.$jazz.id}>
            <input
              className="rounded px-2 py-1"
              value={project.name}
              onChange={(e) => {
                project.$jazz.set("name", e.target.value);
              }}
            />
            <NavLink to={`projects/${project.$jazz.id}`}>
              <span className="text-xs">{project.$jazz.id}</span>
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
