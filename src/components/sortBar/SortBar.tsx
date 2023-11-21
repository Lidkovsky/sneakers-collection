import React, { useEffect, useState } from "react";
import "./styles.scss";
import Button from "../../ui/button/Button";
import calendarIcon from "../../images/calendar-icon.svg";
import dollarIcon from "../../images/dollar-icon.svg";
import sizeIcon from "../../images/size-icon.svg";

interface Props {
  setFilter: React.Dispatch<React.SetStateAction<string | undefined>>;

  className?: string;
}

function SortBar({ className, setFilter }: Props) {
  const filtersArr = [
    { title: "Oldest year", name: "year", icon: calendarIcon },
    { title: "Smallest size", name: "size", icon: dollarIcon },
    { title: "Lowest price", name: "price", icon: sizeIcon },
  ];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<any>(undefined);

  useEffect(() => {
    if (selectedOption) setFilter(selectedOption.name);
    else setFilter(undefined);
  }, [selectedOption]);

  return (
    <>
      <div className={"sortBarMob " + className}>
        <Button
          className="dropdownButton"
          type="secondary"
          text={
            "Sort by: " +
            (selectedOption ? selectedOption.title : "Select an option")
          }
          onClick={() => setIsOpen(!isOpen)}
        />

        <div className={`dropdownContent ${isOpen ? "open" : ""}`}>
          {filtersArr.map((item, index) => (
            <div
              key={item.name + index}
              className="dropdownOption"
              onClick={() => {
                selectedOption && selectedOption.name === item.name
                  ? setSelectedOption(undefined)
                  : setSelectedOption(item);
                setIsOpen(false);
              }}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
      <div className={"sortbarWrapper " + className}>
        <label>Sort by:</label>
        {filtersArr.map((item, index) => {
          return (
            <Button
              text={item.title}
              size="small"
              type="secondary"
              state={
                selectedOption && selectedOption.name === item.name
                  ? "active"
                  : "default"
              }
              onClick={() => {
                selectedOption && selectedOption.name === item.name
                  ? setSelectedOption(undefined)
                  : setSelectedOption(item);
              }}
              key={index + item.name}
              iconUrl={item.icon}
            />
          );
        })}
      </div>
    </>
  );
}

export default SortBar;
