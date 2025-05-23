import { useEffect, useRef, useState } from "react";

// modal com o formulário para criação de nova tarefa
export const Modal = ({ open, onClose, statusList, setCards, cards }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");

  const selectRef = useRef(null);

  // põe '/' a cada 2 números preenchidos no input date range
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

  // fecha a lista de opções de status ao clicar fora das opções
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // reseta os valores dos inputs
  const resetForm = () => {
    setName("");
    setDescription("");
    setStartAt("");
    setEndAt("");
    setSelected(null);
  };

  // reseta os valores dos inputs e fecha o modal
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // função de submit no formulário que cria uma nova tarefa
  const formSubmit = (e) => {
    e.preventDefault();

    const formatDate = (dateStr) => {
      // formata a data
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
      const day = dateStr.slice(0, 2);
      const month = months[parseInt(dateStr.slice(3, 5), 10) - 1];
      return `${month} ${day}`;
    };

    const newCard = {
      // cria uma nova tarefa com os dados do formulário
      id: cards.length + 1,
      name,
      description,
      status: selected,
      startAt: formatDate(startAt),
      endAt: formatDate(endAt),
    };

    setCards([...cards, newCard]);
    resetForm();
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center ${
        open ? "visible bg-neutral-800/50" : "invisible"
      }`}
    >
      <div className="flex flex-col justify-center items-center w-120 bg-neutral-50 shadow-xl rounded-lg p-8">
        <div className="w-full flex flex-col gap-6">
          <div>
            <span
              onClick={handleClose}
              style={{ fontSize: "18px" }}
              className="material-icons-outlined absolute top-87 right-220 cursor-pointer text-neutral-400 hover:text-neutral-800"
            >
              close
            </span>
            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-[18px] text-neutral-800">
                Create a new task
              </h1>
              <h2 className="font-light text-base text-neutral-600">
                Provide task information to add it to your workflow.
              </h2>
            </div>
          </div>

          <form onSubmit={formSubmit} className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-neutral-800">Name</label>
                <input
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="border border-neutral-200 p-2 rounded-sm text-neutral-800 font-light focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-neutral-800">
                  Description
                </label>
                <input
                  name="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="border border-neutral-200 p-2 rounded-sm text-neutral-800 font-light focus:outline-none"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col w-[50%] gap-2">
                  <label className="font-medium text-neutral-800">
                    Date Range
                  </label>
                  <div className="flex items-center gap-[10px] font-medium">
                    <input
                      type="text"
                      name="startAt"
                      value={startAt}
                      onChange={(e) => handleInputChange(e, setStartAt)}
                      maxLength="5"
                      placeholder="DD/MM"
                      className="w-[68px] p-2 border border-neutral-200 rounded-sm text-neutral-700 font-light focus:outline-none"
                    />
                    -
                    <input
                      type="text"
                      name="endAt"
                      value={endAt}
                      onChange={(e) => handleInputChange(e, setEndAt)}
                      maxLength="5"
                      placeholder="DD/MM"
                      className="w-[68px] p-2 border border-neutral-200 rounded-sm text-neutral-700 font-light focus:outline-none"
                    />
                  </div>
                </div>

                <div className="w-[50%] flex flex-col gap-2">
                  <label className="font-medium text-neutral-800">Status</label>
                  <div ref={selectRef} className="relative">
                    <div
                      onClick={() => setIsOpen(!isOpen)}
                      className={`border border-neutral-200 px-2 py-2 rounded-sm cursor-pointer font-light ${
                        selected ? "text-neutral-800" : "text-neutral-400"
                      }`}
                    >
                      {selected ? selected.name : "Select status"}
                    </div>
                    {isOpen && (
                      <ul className="absolute z-10 w-full bg-neutral-50 border border-neutral-200 mt-1 rounded-sm shadow">
                        {statusList.map((status) => (
                          <li
                            key={status.id}
                            onClick={() => {
                              setSelected(status);
                              setIsOpen(false);
                            }}
                            className="px-3 py-2 hover:bg-neutral-100 cursor-pointer flex items-center gap-2"
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
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-sm bg-neutral-800 py-2 px-4 font-medium text-neutral-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-sm bg-neutral-800 py-2 px-4 font-medium text-neutral-50 cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
