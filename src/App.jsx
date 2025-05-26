import { useState } from "react";
import { KanbanProvider } from "./components/KanbanProvider";
import { KanbanHeader } from "./components/Header";
import { TimeCounter } from "./components/TimeCounter";

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
    timeUsed: "04:00",
  },
  {
    id: 2,
    name: "Frontend Scene Analysis",
    description: "Frontend Integration",
    status: statusList[0],
    startAt: "May 14",
    endAt: "May 15",
    timeUsed: "00:00",
  },
];

export default function App() {
  const [open, setOpen] = useState(false);
  const [cards, setCards] = useState(initialCards);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex justify-center items-center rounded-2xl">
        <div className="flex flex-col gap-2">
          <KanbanHeader
            open={open}
            setOpen={setOpen}
            onClose={() => setOpen(false)}
            statusList={statusList}
            setCards={setCards}
            cards={cards}
          />
          <KanbanProvider
            statusList={statusList}
            cards={cards}
            setCards={setCards}
          />
          <TimeCounter cards={cards} statusName={'Completed'}/>
        </div>
      </div>
    </div>
  );
}
