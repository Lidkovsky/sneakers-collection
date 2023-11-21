import { ChangeEvent, useState } from "react";
import "./styles.scss";
import TextInput from "../../ui/textInput/TextInput";

interface Props {
  label: string;
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

  return (
    <label className={"label " + className}>
      {label}
      <TextInput
        className={error ? " invalid" : ""}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setError(false);
          onChange(e);
        }}
        disabled={disabled}
        required={required}
        onInvalid={handleInvalid}
      />
      <p className="errorMessage">{error}</p>
    </label>
  );
}

export default TextField;
