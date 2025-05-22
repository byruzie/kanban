import { Modal } from "./KanbanModal";

export const KanbanHeader = ({ open, setOpen, onClose, statusList, setCards, cards }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold text-slate-800">Tasks</h1>
        <button
          className="border border-slate-200 rounded-sm bg-slate-100 py-2 px-4 cursor-pointer font-semibold text-slate-800"
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
