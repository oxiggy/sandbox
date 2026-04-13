import type { Route } from "./+types/route";
import { useProjectSelector } from "@/contexts/project";
import { CreateInviteLinkDialog } from "./CreateInviteLinkDialog";
import { XIcon } from "lucide-react";
import { useState } from "react";

export default function ProjectHome(props: Route.ComponentProps) {
  const project = useProjectSelector();
  const [newTaskName, setNewTaskName] = useState("");

  const handleAddTask = () => {
    const name = newTaskName.trim();
    if (!name) return;

    project.tasks.$jazz.push({ name });
    setNewTaskName("");
  };

  const handleDeleteTask = (id: string) => {
    project.tasks.$jazz.remove((item) => item.$jazz.id === id);
  };

  return (
    <div>
      <h1>Project here</h1>

      <CreateInviteLinkDialog />

      <div>
        <div>Name: {project.name}</div>
        <div>Description: {project.description}</div>
      </div>

      <div>
        <h2>Tasks</h2>

        <div className="flex gap-4 my-4">
          <textarea
            className="border rounded px-2 py-1"
            placeholder="Task name"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddTask();
            }}
          />
          <button className="app-btn app-btn-neutral" onClick={handleAddTask}>
            Add task
          </button>
        </div>

        <ul className="space-y-4">
          {project.tasks.map((task) => (
            <li className="flex gap-4 items-center" key={task.$jazz.id}>
              <textarea
                className="border rounded px-2 py-1"
                value={task.name}
                onChange={(e) => {
                  task.$jazz.set("name", e.target.value);
                }}
              />
              <button
                className="app-btn-icon app-btn-error"
                onClick={() => handleDeleteTask(task.$jazz.id)}
              >
                <XIcon />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
