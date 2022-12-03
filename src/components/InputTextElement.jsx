function InputTextElement(prop) {
    const { placeholder, name, error, register, type } = prop;
    return (
      <input
        type={type}
        name={name}
        id={name}
        autoComplete="off"
        placeholder={placeholder}
        className={`w-full py-1.5 rounded-xl border-2 bg-cleanColor pl-3 caret-grey-200 outline-none placeholder:text-grey-500 focus:border-blue-200 ${
          error
            ? 'border-red-500 text-red-500'
            : 'border-transparent text-black-600'
        }`}
        {...register}
      />
    );
  }
  export default InputTextElement;