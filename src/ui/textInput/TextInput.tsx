import { ChangeEvent } from "react";
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
  onInvalid?: (e: any) => void;
  iconUrl?: string;
}

function TextInput({
  label,
  placeholder,
  name,
  type = "text",
  value,
  onChange,
  disabled,
  required = false,
  onInvalid,
  className,
}: Props) {
  return (
    <input
      className={"textInput " + className}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      onInvalid={onInvalid}
    />
  );
}

export default TextInput;
