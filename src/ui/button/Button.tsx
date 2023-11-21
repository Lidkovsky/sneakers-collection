import React from "react";
import "./styles.scss";

interface Props {
  className?: string;
  text: string;
  iconUrl?: string;
  icon?: "left" | "right";
  type?: "primary" | "secondary";
  size?: "large" | "small";
  state?: "active" | "disabled" | "default";
  buttonType?: "button" | "reset" | "submit";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
function Button({
  className,
  text,
  iconUrl,
  icon = "left",
  type = "primary",
  size = "large",
  state = "default",
  buttonType = "button",
  onClick,
}: Props) {
  const buttonClass =
    "button " +
    className +
    " " +
    type +
    " " +
    size +
    " " +
    (state !== "disabled" ? state : "") +
    " " +
    icon;

  return (
    <button
      className={buttonClass}
      type={buttonType}
      disabled={state === "disabled" ? true : false}
      onClick={onClick}
    >
      {iconUrl && <img src={iconUrl} alt="icon" />}
      {text}
    </button>
  );
}

export default Button;
