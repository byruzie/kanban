import { useDroppable } from "@dnd-kit/core";
import { KanbanCards } from "./KanbanCards";

// estilo do board de cards e funcionalidade de droppable, recebe uma lista de status e cards
export const KanbanBoard = ({ statusList, cards, onEdit }) => {
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
              "w-60 min-h-80 max-h-76 border border-neutral-200 rounded-lg bg-neutral-100 flex gap-2 justify-center"
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
                  <p className="font-semibold text-neutral-800">{status.name}</p>
                </div>
              </div>
              <div
                className={`flex flex-col gap-2 overflow-x-hidden ${
                  filteredCards.length > 3
                    ? "pr-1 overflow-y-auto [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar-thumb]:rounded-full"
                    : "overflow-y-hidden pr-1"
                } `}
              >
                <KanbanCards cards={filteredCards} onEdit={onEdit} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
