import { Modal } from "./Modal";

export const KanbanHeader = ({
  open,
  setOpen,
  statusList,
  setCards,
  cards,
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-end">
        <button
          className="rounded-sm bg-neutral-800 py-2 px-4 cursor-pointer font-medium text-neutral-50"
          onClick={() => setOpen(true)}
        >
          New
        </button>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        list={statusList}
        title={"Create a new task"}
        subtitle={"Provide task information to add it to your workflow."}
        setCards={setCards}
        cards={cards}
      />
    </div>
  );
};
