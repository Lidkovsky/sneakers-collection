import React, { ChangeEvent, RefObject, useEffect, useState } from "react";
import TextField from "../../ui/textField/TextField";
import "./styles.scss";
import Button from "../../ui/button/Button";
import plusIcon from "../../images/plus-icon.svg";
import closeIcon from "../../images/close-icon.svg";
import emptyStar from "../../images/star-empty.svg";
import filledStar from "../../images/star-filled.svg";
import {
  SneakerInterfase,
  BASE_URL,
} from "../../components/sneakersList/SneakersList";
import RatingStars from "../../ui/ratingStars/RatingStars";

// export function UseNewForm(ref){
//   ref.
// }

interface Props {
  toggleOpen: () => void;
}

function AddNewForm({ toggleOpen }: Props) {
  const fieldsArr = [
    { label: "Name", name: "name", type: "text" as const },
    { label: "Brand", name: "brand", type: "text" as const },
    { label: "Price", name: "price", type: "number" as const },
    { label: "Size US", name: "size", type: "number" as const },
    { label: "Year", name: "year", type: "number" as const },
  ];

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newShoe, setNewShoe] = useState<SneakerInterfase>({
    name: "",
    brand: "",
    rating: 0,
    year: 0,
    size: 0,
    price: 0,
  });
  const [rating, setRating] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);

  //handle rating change from RatingStars component
  useEffect(() => {
    handleChange({ target: { name: "rating", value: rating } });
  }, [rating]);

  //handle text fields input
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewShoe({ ...newShoe, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    toggleOpen();
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/sneakers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newShoe),
      });

      const sneaker = await response.json();
      console.log(sneaker);
      window.location.reload();
    } catch (e: any) {
      setError(e);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <p className="h2">Add sneakers to your collection</p>

      <form onSubmit={handleSubmit} className="addNewForm">
        <div className="upperForm">
          {fieldsArr.map((field, index) => {
            return (
              <TextField
                key={index + field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                onChange={handleChange}
                required
              />
            );
          })}
          <label className="label">
            Rate
            <div className="starsWrapper">
              <RatingStars editable rating={rating} onChange={setRating} />
            </div>
          </label>
        </div>
        <div className="bottomForm">
          <Button
            text={isLoading ? "Loading" : "Add new sneaker"}
            buttonType="submit"
            state={isLoading ? "disabled" : "default"}
            iconUrl={isLoading ? undefined : plusIcon}
          />
        </div>
      </form>
    </>
  );
}

export default AddNewForm;
