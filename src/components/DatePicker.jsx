import { FaRegCalendarAlt } from "react-icons/fa";

const DatePicker = ({ label, labelClass, name, onChange, value }) => {
  return (
    <div className="flex flex-col">
      <label className={`${labelClass} `}>{label}</label>
      <div className="flex border border-slate-300 rounded-md bg-white items-center focus-within:ring-2 focus-within:ring-slate-400 transition-all duration-200">
        <div className="p-2">
          <FaRegCalendarAlt />
        </div>
        <input
          className="flex-grow px-2 py-2 focus:outline-none bg-transparent"
          type="date"
          name={name}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default DatePicker;
