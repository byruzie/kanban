import { useEffect, useState } from "react";
import { KanbanBoard } from "./KanbanBoard";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { KanbanCard } from "./KanbanCard";
import { Modal } from "./Modal";

// ativa a funcionalidade de dropped/draggable e renderiza o componente kanbanBoard
export const KanbanProvider = ({ statusList, cards, setCards }) => {
  const [activeCard, setActiveCard] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [cardToEdit, setCardToEdit] = useState(null);

  const handleEditCard = (card) => {
    setCardToEdit(card);
    setEditModalOpen(true);
  };

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

  // solução para double click bug
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const sensors = useSensors(pointerSensor);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        const cardId = parseInt(active.id);
        const foundCard = cards.find((c) => c.id === cardId);
        setActiveCard(foundCard);
      }}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveCard(null)}
    >
      <KanbanBoard
        statusList={statusList}
        cards={cards}
        onEdit={handleEditCard}
      />

      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        list={statusList}
        title={"Edit your task"}
        subtitle={"Update the task information and save your changes."}
        setCards={setCards}
        cards={cards}
        cardToEdit={cardToEdit}
      />

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
