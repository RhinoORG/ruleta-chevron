function LabelElement(prop) {
  const { name, error, children, forElement, errorMessage, textStyle } = prop;
  return (
    <label
      htmlFor={forElement}
      className={`w-full ${error ? 'text-red-500' : 'text-cleanColor'}`}
    >

      {children}
      {error && (
        <p className="mt-2 font-montserratRegular text-sm text-red-500">
          {errorMessage}
        </p>
      )}
    </label>
  );
}
export default LabelElement;