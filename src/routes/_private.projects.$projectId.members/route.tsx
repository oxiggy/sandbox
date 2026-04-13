import { useState } from "react";
import type { Route } from "./+types/route";
import { useProjectSelector } from "@/contexts/project";
import { AccountSchema } from "@/schema";
import { Account } from "jazz-tools";
import { XIcon } from "lucide-react";

export default function ProjectMembers(props: Route.ComponentProps) {
  const project = useProjectSelector();
  const [id, setId] = useState("");

  const handleAddMember = () => {
    Account.load(id).then((member) => {
      if (member.$isLoaded) {
        project.$jazz.owner.addMember(member, "writer");
      }
    });
  };

  const handleRemoveMember = (member: Account) => {
    project.$jazz.owner.removeMember(member);
  };

  return (
    <div>
      <h1>Project members here</h1>

      {project.$jazz.owner.getDirectMembers().map((member) => (
        <div className="flex gap-4" key={member.id}>
          <span>{member.id}</span>
          <span>{member.account.$jazz.id}</span>
          <span>{member.role}</span>

          <button
            className="app-btn-icon app-btn-error"
            onClick={() => handleRemoveMember(member.account)}
          >
            <XIcon />
          </button>
        </div>
      ))}

      <input
        value={id}
        onInput={({ currentTarget: { value } }) => {
          setId(value);
        }}
      />

      <button onClick={handleAddMember} disabled={!id}>
        Add member
      </button>
    </div>
  );
}
