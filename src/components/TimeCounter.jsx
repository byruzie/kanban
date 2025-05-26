export const TimeCounter = ({ cards, statusName }) => {
  const sumTimeUsedByStatus = () => {
    let totalMinutes = 0;

    cards.forEach((card) => {
      if (card.status?.name === statusName && card.timeUsed) {
        const [hours, minutes] = card.timeUsed.split(":").map(Number);
        totalMinutes += hours * 60 + minutes;
      }
    });

    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    if (totalMinutes === 0) return "0h";

    if (remainingMinutes === 0) {
      return `${totalHours}h`;
    } else {
      return `${totalHours}h${remainingMinutes}`;
    }
  };

  return (
    <div className="border border-neutral-800 rounded-sm w-[128px] h-[34px] flex items-center">
      <div className="flex justify-center items-center w-[48%] h-full">
        <h1 className="font-medium flex justify-center items-center w-full h-full bg-neutral-800 text-neutral-50">Time</h1>
      </div>
      <div className="flex justify-center items-center w-[52%] h-full">
        <h2>
          {sumTimeUsedByStatus()}
        </h2>
      </div>
    </div>
  );
};
