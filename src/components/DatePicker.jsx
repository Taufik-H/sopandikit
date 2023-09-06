const DatePicker = ({ label, labelClass, name, onChange }) => {
  return (
    <div className="flex flex-col">
      <label className={`${labelClass} `}>{label}</label>
      <input
        className="border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all duration-200"
        type="date"
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default DatePicker;
