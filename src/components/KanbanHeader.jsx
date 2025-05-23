import { Modal } from "./KanbanModal";

export const KanbanHeader = ({ open, setOpen, onClose, statusList, setCards, cards }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-neutral-800">Tasks</h1>
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
        statusList={statusList}
        setCards={setCards}
        cards={cards}
      />
    </div>
  );
};
