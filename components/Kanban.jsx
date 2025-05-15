export const KanbanCard = ({ cards }) => {
  return (
    <div className="flex flex-col gap-2">
      {cards.map((card) => (
        <div
          className="flex flex-col gap-2 border border-slate-200 rounded-lg bg-slate-50 min-h-20 w-full"
          key={card.id}
        >
          <div className="flex flex-col gap-2 p-2">
            <div>
              <p className="font-semibold text-sm text-slate-800">
                {card.name}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-600">{card.description}</p>
              <p className="text-xs text-slate-600">
                {card.startAt} - {card.endAt}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const KanbanBoard = ({ statusList, cards }) => {
  return (
    <div className="flex gap-2">
      {statusList.map((status) => {
        const filteredCards = cards.filter(
          (card) => card.status.id === status.id
        );

        return (
          <div
            className="w-50 min-h-54 border border-slate-200 rounded-lg bg-slate-100 flex gap-2 justify-center p-2 pt-2"
            key={status.id}
          >
            <div className="flex flex-col gap-2 w-full">
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
              <div>
                <KanbanCard cards={filteredCards} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const KanbanProvider = () => {
  return (
    <div>Hello World</div>
  )
}