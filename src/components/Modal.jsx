import { useEffect, useRef, useState } from "react";
import { Select } from "./Select";

// modal com o formulário para criação de nova tarefa
export const Modal = ({
  open,
  onClose,
  list,
  title,
  subtitle,
  setCards,
  cards,
  cardToEdit,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(null);
  const [timeUsed, setTimeUsed] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");

  // reseta os valores do form
  const resetForm = () => {
    setName("");
    setDescription("");
    setStartAt("");
    setEndAt("");
    setTimeUsed("");
    setStatus(null);
  };

  // fecha o modal e chama a função de resetar os valores
  const handleClose = () => {
    onClose();
    resetForm();
  };

  // põe ':' a cada 2 números preenchidos no input timeUsed
  const handleInput = (e, setTimeUsed) => {
    const value = e.target.value.replace(/\D/g, "");
    let formattedValue = value;
    if (formattedValue.length > 2) {
      formattedValue =
        formattedValue.slice(0, 2) + ":" + formattedValue.slice(2, 4);
    }
    if (formattedValue.length <= 5) {
      setTimeUsed(formattedValue);
    }
  };

  const parseDate = (dateString) => {
    // de "May 25" para "2025-05-25" (ajuste se tiver ano)
    const months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    const [monthStr, day] = dateString.split(" ");
    const today = new Date();
    const year = today.getFullYear(); // ou salve o ano corretamente

    return `${year}-${months[monthStr]}-${day.padStart(2, "0")}`;
  };

  // atualiza os campos se cardToEdit mudar
  useEffect(() => {
    if (cardToEdit && open) {
      console.log("📝 cardToEdit recebido:", cardToEdit);

      setName(cardToEdit.name || "");
      setDescription(cardToEdit.description || "");
      setStartAt(parseDate(cardToEdit.startAt));
      setEndAt(parseDate(cardToEdit.endAt));
      setStatus(cardToEdit.status || null);
      setTimeUsed(cardToEdit.timeUsed || "");
    }

    if (!cardToEdit && open) {
      console.log("🆕 Modo criação - nenhum card para editar");
      resetForm();
    }
  }, [cardToEdit, open]);

  // função de submit no formulário que cria uma nova tarefa
  const formSubmit = (e) => {
    e.preventDefault();

    const formatDate = (dateString) => {
      // formata a data em mês dia, ex: May 25
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const [year, month, day] = dateString.split("-");
      const formattedMonth = months[parseInt(month) - 1];
      const formattedDay = day.padStart(2, "0");
      return `${formattedMonth} ${formattedDay}`;
    };

    if (cardToEdit) {
      // Modo edição
      setCards((prev) =>
        prev.map((c) =>
          c.id === cardToEdit.id
            ? {
                ...c,
                name,
                description,
                status,
                timeUsed,
                startAt: formatDate(startAt),
                endAt: formatDate(endAt),
              }
            : c
        )
      );
    } else {
      const newCard = {
        // cria uma nova tarefa com os dados do formulário
        id: cards.length + 1,
        name,
        description,
        status,
        timeUsed,
        startAt: formatDate(startAt),
        endAt: formatDate(endAt),
      };
      setCards([...cards, newCard]);
    }

    resetForm();
    onClose();
  };

  return (
    <div>
      <div
        className={`fixed inset-0 flex justify-center items-center ${
          open ? "visible bg-neutral-800/50" : "invisible"
        }`}
      >
        <div className="flex flex-col justify-center items-center w-[450px] bg-neutral-50 shadow-xl rounded-lg p-8">
          <div className="w-full flex flex-col gap-6">
            <div className="">
              <div className="flex justify-between">
                <h1 className="font-semibold text-[20px] text-neutral-800">
                  {title}
                </h1>
                <span
                  onClick={onClose}
                  style={{ fontSize: "18px" }}
                  className="material-icons-outlined flex justify-end cursor-pointer text-neutral-400 hover:text-neutral-800"
                >
                  close
                </span>
              </div>
              <div>
                <p className="font-light text-base text-neutral-600">
                  {subtitle}
                </p>
              </div>
            </div>
            <form onSubmit={formSubmit} className="flex flex-col gap-4 w-full">
              <div className="flex items-center gap-4">
                <label htmlFor="">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter the name of the task"
                  className="w-[348px] border border-neutral-200 p-2 rounded-sm text-neutral-800 font-light focus:outline-none placeholder:text-neutral-800 placeholder:font-light"
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="">Short Description</label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  placeholder="Enter a short description of your task"
                  className="w-full border border-neutral-200 p-2 rounded-sm text-neutral-800 font-light focus:outline-none placeholder:text-neutral-800 placeholder:font-light"
                />
              </div>
              <div className="w-full flex items-center gap-[58px]">
                <div className="flex items-center gap-2">
                  <label htmlFor="" className="w-[77px]">
                    Time Used
                  </label>
                  <input
                    type="text"
                    value={timeUsed}
                    onChange={(e) => handleInput(e, setTimeUsed)}
                    placeholder="00:00"
                    className="w-[58px] border border-neutral-200 p-2 rounded-sm text-neutral-800 font-light focus:outline-none placeholder:text-neutral-800 placeholder:font-light"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label htmlFor="">Status</label>
                  <Select list={list} onChange={setStatus} selected={status} />
                </div>
              </div>

              <div className="flex justify-between w-full">
                <div className="flex items-center gap-2">
                  <label htmlFor="">Start At</label>
                  <input
                    value={startAt}
                    onChange={(e) => setStartAt(e.target.value)}
                    type="date"
                    className="w-[125px] border border-neutral-200 p-2 rounded-sm text-neutral-800 font-light focus:outline-none placeholder:text-neutral-300"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="">End At</label>
                  <input
                    value={endAt}
                    onChange={(e) => setEndAt(e.target.value)}
                    type="date"
                    className="w-[125px] border border-neutral-200 p-2 rounded-sm text-neutral-800 font-light focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-2">
                <button
                  onClick={handleClose}
                  className="rounded-sm bg-neutral-800 py-2 px-4 cursor-pointer font-medium text-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-sm bg-neutral-800 py-2 px-4 cursor-pointer font-medium text-neutral-50"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
