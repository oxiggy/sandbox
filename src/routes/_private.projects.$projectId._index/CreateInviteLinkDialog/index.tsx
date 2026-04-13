import { useProjectSelector } from "@/contexts/project";
import * as Dialog from "@radix-ui/react-dialog";
import { createInviteLink } from "jazz-tools/react";
import { useState } from "react";

export const CreateInviteLinkDialog = () => {
  const project = useProjectSelector();
  const [created, setCreated] = useState("");

  const handleCreate = () => {
    setCreated(
      createInviteLink(project, "writer", {
        baseURL: window.location.origin + "/invite",
      }),
    );
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="inline-flex h-[35px] items-center justify-center rounded bg-violet4 px-[15px] font-medium leading-none text-violet11 outline-none outline-offset-1 hover:bg-mauve3 focus-visible:outline-2 focus-visible:outline-violet6 select-none">
          Create invite link
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 data-[state=open]:animate-overlayShow" />

        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-neutral-100 p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-[17px] font-medium text-mauve12">
            Create invite link
          </Dialog.Title>

          <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Dialog.Description>

          <div>Role:</div>

          {!!created && <div>{created}</div>}

          <div className="mt-[25px] flex justify-end">
            {/*<Dialog.Close asChild>*/}
            <button
              className="inline-flex h-[35px] items-center justify-center rounded bg-green4 px-[15px] font-medium leading-none text-green11 outline-none outline-offset-1 hover:bg-green5 focus-visible:outline-2 focus-visible:outline-green6 select-none"
              onClick={handleCreate}
            >
              Create link
            </button>
            {/*</Dialog.Close>*/}
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 bg-gray3 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
              aria-label="Close"
            >
              x
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
