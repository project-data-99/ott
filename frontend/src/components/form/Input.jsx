const Input = ({ label, type, name, required, error, className, ...props }) => {
  return (
    <>
      <div className={`block ${className}`}>
        <label className="block text-sm text-light mb-1" htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type={type}
          className="block w-full py-3 px-4 bg-darkAlt border border-solid border-darkAlt rounded transition duration-200"
          id={name}
          name={name}
          required={required}
          {...props}
        />
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    </>
  );
};

export default Input;
