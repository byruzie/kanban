import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { useEffect, useRef, useState } from "react";

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
      <div className="flex flex-col gap-2 px-2 py-[10px]">
        <div>
          <p className="font-semibold text-slate-800">{card.name}</p>
        </div>
        <div>
          <p className="text-sm text-slate-600">{card.description}</p>
          <p className="text-sm text-slate-600">
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
              "w-60 min-h-80 max-h-76 border border-slate-200 rounded-lg bg-slate-100 flex gap-2 justify-center"
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
                  <p className="font-semibold text-slate-800">{status.name}</p>
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

export const Header = ({ name, newClick }) => {
  return (
    <div className="w-full flex justify-between">
      <h1 className="text-xl font-semibold text-slate-800">{name}</h1>
      <button
        className="border border-slate-200 rounded-sm bg-slate-100 py-1 px-6 cursor-pointer font-semibold text-slate-800"
        onClick={newClick}
      >
        New
      </button>
    </div>
  );
};

export const Modal = ({ open, onClose, statusList, setCards, cards }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");

  const handleInputChange = (e, setDate) => {
    const value = e.target.value.replace(/\D/g, "");
    let formattedValue = value;
    if (formattedValue.length > 2) {
      formattedValue =
        formattedValue.slice(0, 2) + "/" + formattedValue.slice(2, 4);
    }
    if (formattedValue.length <= 5) {
      setDate(formattedValue);
    }
  };

  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formSubmit = (e) => {
    e.preventDefault();

    const newCard = {
      id: cards.length + 1,
      name,
      description,
      status: selected,
      startAt,
      endAt,
    };

    setCards([...cards, newCard]);

    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setStartAt("");
    setEndAt("");
    setSelected(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center ${
        open ? "visible bg-slate-800/40" : "invisible"
      }`}
    >
      <div className="flex flex-col justify-center items-center w-80 bg-slate-50 border border-slate-100 rounded-lg p-6">
        <form onSubmit={formSubmit} className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-1">
            <label>Name</label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="border border-slate-200 p-2 rounded-sm focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Description</label>
            <input
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="border border-slate-200 p-2 rounded-sm focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Status</label>
            <div ref={selectRef} className="relative">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="border border-slate-200 px-2 py-2 rounded-sm cursor-pointer text-gray-500"
              >
                {selected ? selected.name : "Select status"}
              </div>
              {isOpen && (
                <ul className="absolute z-10 w-full bg-slate-50 border border-slate-200 mt-1 rounded-sm shadow">
                  {statusList.map((status) => (
                    <li
                      key={status.id}
                      onClick={() => {
                        setSelected(status);
                        setIsOpen(false);
                      }}
                      className="px-3 py-2 hover:bg-slate-100 cursor-pointer flex items-center gap-2"
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: status.color }}
                      />
                      {status.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <label>Start At</label>
              <input
                type="text"
                name="startAt"
                value={startAt}
                onChange={(e) => handleInputChange(e, setStartAt)}
                maxLength="5"
                placeholder="DD/MM"
                className="w-[65px] p-2 border border-slate-200 rounded-sm focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-1">
              <label>End At</label>
              <input
                type="text"
                name="endAt"
                value={endAt}
                onChange={(e) => handleInputChange(e, setEndAt)}
                maxLength="5"
                placeholder="DD/MM"
                className="w-[65px] p-2 border border-slate-200 rounded-sm focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="border border-slate-200 rounded-sm bg-slate-100 py-1 px-6 font-semibold text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border border-slate-200 rounded-sm bg-slate-100 py-1 px-6 font-semibold text-slate-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

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