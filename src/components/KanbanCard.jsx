import { useDraggable } from "@dnd-kit/core";

// estilo do card e funcionalidade de draggable, recebe { card }
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