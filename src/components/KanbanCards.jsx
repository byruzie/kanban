import { KanbanCard } from "./KanbanCard";

// lisya os cards, recebe { cards }
export const KanbanCards = ({ cards }) => {
  return (
    <div className="flex flex-col gap-2">
      {cards.map((card) => (
        <KanbanCard key={card.id} card={card} />
      ))}
    </div>
  );
};
