import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { useState } from "react";

export const KanbanCard = ({ card }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id.toString(),
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      className={`flex flex-col gap-2 border border-slate-200 rounded-lg bg-slate-50 h-auto w-full`}
      key={card.id}
      style={style}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
    >
      <div className="flex flex-col gap-2 p-2">
        <div>
          <p className="font-semibold text-sm text-slate-800">{card.name}</p>
        </div>
        <div>
          <p className="text-xs text-slate-600">{card.description}</p>
          <p className="text-xs text-slate-600">
            {card.startAt} - {card.endAt}
          </p>
        </div>
      </div>
    </div>
  );
};

export const KanbanBoard = ({ statusList, cards }) => {
  return (
    <div className="flex gap-2">
      {statusList.map((status) => {
        const { setNodeRef } = useDroppable({
          id: status.id.toString(),
        });

        const filteredCards = cards.filter(
          (card) => card.status.id === status.id
        );

        return (
          <div
            className={
              "w-50 min-h-76 max-h-76 border border-slate-200 rounded-lg bg-slate-100 flex gap-2 justify-center"
            }
            key={status.id}
            ref={setNodeRef}
          >
            <div className="flex flex-col gap-2 w-full py-2 pl-2 pr-1">
              <div className="flex items-center space-x-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: status.color }}
                />
                <div>
                  <p className="font-semibold text-sm text-slate-800">
                    {status.name}
                  </p>
                </div>
              </div>
              <div
                className={`flex flex-col gap-2 overflow-x-hidden ${
                  filteredCards.length > 3
                    ? "pr-1 overflow-y-auto [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full"
                    : "overflow-y-hidden pr-1"
                } `}
              >
                {filteredCards.map((card) => (
                  <KanbanCard key={card.id} card={card} />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Header = ({ name }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex justify-between">
      <h1 className="text-xl font-semibold text-slate-800">{name}</h1>
      <button
        className="border border-slate-200 rounded-sm bg-slate-100 py-1 px-6 cursor-pointer text-sm font-semibold text-slate-800"
        onClick={() => setOpen(true)}
      >
        New
      </button>

      <Modal open={open} onClose={() => setOpen(false)}></Modal>
    </div>
  );
};

export const Modal = ({ open, onClose }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center
      ${open ? "visible bg-slate-800/40" : "invisible"}
    `}
    >
      <div className="flex flex-col justify-center items-center w-[300px] h-[200px] bg-slate-50 border border-slate-100 rounded-lg p-2">
        <div className="border border-amber-300 w-full h-full">
          <div className="w-full h-full flex justify-between items-end">
            <button
              onClick={() => setOpen(false)}
              className="border border-slate-200 rounded-sm bg-slate-100 py-1 px-6 cursor-pointer text-sm font-semibold text-slate-800"
            >
              Cancel
            </button>
            <button className="border border-slate-200 rounded-sm bg-slate-100 py-1 px-6 cursor-pointer text-sm font-semibold text-slate-800">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const KanbanProvider = ({ statusList, cards: initialCards }) => {
  const [cards, setCards] = useState(initialCards);
  const [activeCard, setActiveCard] = useState(null);

  const handleDragEnd = (event) => {
    // cria um evento que é chamado quando algum card é solto nas colunas de status
    const { active, over } = event;

    if (!over) return;

    const cardId = parseInt(active.id); // id do card que está sendo arrastado
    const newStatusId = over.id; // id da coluna de status que o card foi solto

    setCards(
      (
        prevCards // atualiza o estado dos cards arrastados, prevCards são os cards atuais
      ) =>
        prevCards.map(
          (card) =>
            card.id === cardId // compara o id de cada card atual com o id do card arrastado
              ? {
                  ...card, // repete os dados do card (name, description, etc)
                  status: statusList.find(
                    (status) => status.id === newStatusId
                  ), // altera o id do status da nova coluna
                }
              : card // mantém as informações do card atual quando o id não é igual ao do card arrastado
        )
    );
    setActiveCard(null);
  };

  const [open, setOpen] = useState();

  return (
    <DndContext
      onDragStart={({ active }) => {
        // seta como ativo o card que está sendo arrastado para posteriormente usar no DragOverlay
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
