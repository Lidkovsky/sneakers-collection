import React, {
  ChangeEvent,
  FormEvent,
  ReactComponentElement,
  useState,
} from "react";
import "./styles.scss";

interface Props {
  label?: string;
  placeholder?: string;
  name?: string;
  type?: "text" | "email" | "password" | "number";
  value?: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

function TextField({
  label,
  placeholder,
  name,
  type = "text",
  value,
  onChange,
  disabled,
  required = false,
  className,
}: Props) {
  const [error, setError] = useState<string | boolean>(false);

  const handleInvalid = (e: any) => {
    if (!e.currentTarget.value.trim()) {
      e.preventDefault();
      setError("Must be filled");
    } else {
      setError(true);
    }
  };

  return label ? (
    <label className={"label " + className}>
      {label}
      <input
        className={"textFieldInput " + (error ? "invalid" : "")}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        onInvalid={handleInvalid}
      />
      <p className="errorMessage">{error}</p>
    </label>
  ) : (
    <input
      className={"textFieldInput " + className}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      onInvalid={handleInvalid}
    />
  );
}

export default TextField;
