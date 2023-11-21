import React, { useEffect } from "react";
import closeIcon from "../../images/close-icon.svg";
import "./styles.scss";
interface Props {
  toggleOpen: any;
  isOpen: boolean;
  children: any;
}

function SideMenu({ toggleOpen, isOpen, children }: Props) {
  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "scroll");
  }, [isOpen]);
  return (
    <>
      <div
        onClick={toggleOpen}
        className="sideMenuBg"
        style={isOpen ? { display: "block" } : { display: "none" }}
      />
      <div
        className="sideMenuWrapper"
        style={
          isOpen
            ? { transform: "translateX(0)" }
            : { transform: "translateX(100%)" }
        }
      >
        <img
          className="closeIcon"
          src={closeIcon}
          alt="X icon"
          onClick={toggleOpen}
        />
        {children}
      </div>
    </>
  );
}

export default SideMenu;
