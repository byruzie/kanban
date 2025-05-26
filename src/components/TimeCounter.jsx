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

    return `${String(totalHours).padStart(2, "0")}:${String(
      remainingMinutes
    ).padStart(2, "0")}`;
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-neutral-800">Time Used: {sumTimeUsedByStatus()}</h1>
      <h2></h2>
    </div>
  );
};
