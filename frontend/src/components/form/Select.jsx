const Select = ({
  label,
  name,
  required,
  error,
  options,
  value,
  className,
  ...props
}) => {
  return (
    <>
      <div className={`block ${className}`}>
        <label className="block text-sm text-light mb-1" htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select
          className="block w-full py-3 px-4 bg-darkAlt border border-solid border-darkAlt rounded transition duration-200"
          id={name}
          name={name}
          required={required}
          value={value}
          {...props}
        >
          {options.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    </>
  );
};

export default Select;
