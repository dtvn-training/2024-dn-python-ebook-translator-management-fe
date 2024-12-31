function Input({ placeholder, value, setValue, type = 'text', ...props }) {
    const handleChangeValue = (e) => {
        setValue(e.target.value);
    };
    return (
        <input
            {...props}
            type={type}
            className="bg-[#D9D9D9] focus-visible:outline-none w-[350px] h-[35px] rounded-lg px-3"
            placeholder={placeholder}
            value={value}
            onChange={handleChangeValue}
        />
    );
}

export default Input;
