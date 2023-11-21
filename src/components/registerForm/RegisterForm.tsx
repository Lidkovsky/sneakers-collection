import { FormEvent, useState } from "react";

import { useNavigate } from "react-router-dom";
import TextField from "../textField/TextField";
import Button from "../../ui/button/Button";

import "./styles.scss";

interface Props {
  isRegister?: boolean;
}

function RegisterForm({ isRegister = false }: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/main");
  };
  return (
    <form className="registerForm" onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        type="email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        className="registerButton"
        buttonType="submit"
        text={isRegister ? "Register" : "Log In"}
      />
    </form>
  );
}

export default RegisterForm;
