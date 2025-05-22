import { useState } from "react";
import { KanbanBoard } from "./KanbanBoard";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { KanbanCard } from "./KanbanCard";

// ativa a funcionalidade de dropped/draggable e renderiza o componente kanbanBoard
export const KanbanProvider = ({ statusList, cards, setCards }) => {
  const [activeCard, setActiveCard] = useState(null);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const cardId = parseInt(active.id);
    const newStatusId = over.id;

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId
          ? {
              ...card,
              status: statusList.find((status) => status.id === newStatusId),
            }
          : card
      )
    );
    setActiveCard(null);
  };

  return (
    <DndContext
      onDragStart={({ active }) => {
        const cardId = parseInt(active.id);
        const foundCard = cards.find((c) => c.id === cardId);
        setActiveCard(foundCard);
      }}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveCard(null)}
    >
      <KanbanBoard statusList={statusList} cards={cards} />

      <DragOverlay>
        {activeCard ? (
          <div className="z-50 pointer-events-none">
            <KanbanCard card={activeCard} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
