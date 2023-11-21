import React, { useState } from "react";
import logInImg from "../../images/login-img.png";
import registerImg from "../../images/register-img.png";
import "./styles.scss";
import RegisterForm from "../../components/registerForm/RegisterForm";
import Button from "../../ui/button/Button";
function Create() {
  const [isRegister, setIsRegister] = useState<boolean>(false);

  if (isRegister) {
    return (
      <main className="globalWrapper createWrapper">
        <div className="grid createContent">
          <img src={registerImg} alt="register image" />
          <div className="createRight">
            <h1 className="registerTitle">Register new snekerhead</h1>
            <RegisterForm isRegister />
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="globalWrapper createWrapper">
      <div className="grid createContent">
        <img src={logInImg} alt="log in image" />
        <div className="createRight">
          <h1 className="loginTitle">Welcome to a sneaker collector</h1>
          <p className="loginText copy">
            This tool not only lets you showcase your prized sneaker collection
            but also provides you with the tools to curate, organize, and
            catalogue your sneakers like never before.
          </p>
          <RegisterForm />
          <Button
            text="Register"
            type="secondary"
            onClick={() => setIsRegister(true)}
          />
        </div>
      </div>
    </main>
  );
}

export default Create;
