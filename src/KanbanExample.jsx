import { useState } from "react";
import { Header, KanbanProvider, Modal } from "../components/Kanban";

const statusList = [
  { id: "1", name: "Pending", color: "#6B7280" },
  { id: "2", name: "In Progress", color: "#F59E0B" },
  { id: "3", name: "Completed", color: "#10B981" },
];

const initialCards = [
  {
    id: 1,
    name: "AI Scene Analysis",
    description: "AI Integration",
    status: statusList[2],
    startAt: "May 14",
    endAt: "May 15",
  },
  {
    id: 2,
    name: "Frontend Scene Analysis",
    description: "Frontend Integration",
    status: statusList[0],
    startAt: "May 14",
    endAt: "May 15",
  },
];

function KanbanExample() {
  const [open, setOpen] = useState(false);
  const [cards, setCards] = useState(initialCards);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col gap-4">
        <Header name={"Tasks"} newClick={() => setOpen(true)} />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          statusList={statusList}
          setCards={setCards}
          cards={cards}
        />
        <KanbanProvider statusList={statusList} cards={cards} setCards={setCards} />
      </div>
    </div>
  );
}

export default KanbanExample;

