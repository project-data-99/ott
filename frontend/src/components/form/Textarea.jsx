const Textarea = ({ label, name, required, error, className, ...props }) => {
  return (
    <>
      <div className={`block ${className}`}>
        <label className="block text-sm text-light mb-1" htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          className="block w-full py-3 px-4 bg-darkAlt border border-solid border-darkAlt rounded transition duration-200"
          id={name}
          name={name}
          required={required}
          rows="4"
          {...props}
        ></textarea>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    </>
  );
};

export default Textarea;
