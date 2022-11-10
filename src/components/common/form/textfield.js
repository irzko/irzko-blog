import { useState } from "react";
import clsx from "clsx";

const TextField = ({
  type,
  label,
  id,
  name = id,
  className = "",
  onChange,
  value,
  errorMsg,
  checkValid,
}) => {
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(!focus);
  };

  const handleBlur = () => {
    setFocus(!focus);
    if (checkValid) {
      checkValid(id);
    }
  };

  return (
    <div className={className}>
      <div className="relative">
        <input
          className={clsx(
            errorMsg
              ? "border-red-500 focus:border-red-500"
              : "focus:border-blue-500",
            "focus:outline-none h-12 w-full border focus:border-[3px] rounded-md p-3"
          )}
          type={type}
          id={id}
          name={name}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        ></input>
        <label
          className="left-2 right-0 absolute inset-y-0 border-3 border-transparent bg-transparent flex items-center pointer-events-none"
          htmlFor={id}
        >
          <div
            className={clsx(
              "px-1",
              focus || value
                ? "translate-y-[-1.55rem] text-xs bg-white"
                : "bg-transparent"
            )}
          >
            {label}
          </div>
        </label>
      </div>
      <span className="text-red-500 text-xs">{errorMsg}</span>
    </div>
  );
};

export default TextField;
