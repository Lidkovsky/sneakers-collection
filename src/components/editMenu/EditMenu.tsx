import { useEffect, useState } from "react";
import isEqual from "lodash/isEqual";
import TextField from "../../ui/textField/TextField";
import "./styles.scss";
import Button from "../../ui/button/Button";
import {
  SneakerAPIInterfase,
  BASE_URL,
  SneakerInterfase,
} from "../../components/sneakersList/SneakersList";
import RatingStars from "../../ui/ratingStars/RatingStars";

interface Props {
  shoe: SneakerAPIInterfase;
  toggleOpen: any;
}

function EditMenu({ shoe, toggleOpen }: Props) {
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { _id, ...shoeWithoutId } = shoe;
  const [editedShoe, setEditedShoe] = useState<SneakerInterfase>(shoeWithoutId);

  const [rating, setRating] = useState<0 | 1 | 2 | 3 | 4 | 5>(shoe.rating);

  //handle rating change from RatingStars component
  useEffect(() => {
    handleChange({ target: { name: "rating", value: rating } });
  }, [rating]);

  //handle text fields input
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    //setEditedShoe({ ...editedShoe, name: value });
    setEditedShoe({ ...editedShoe, [name]: value });
  };

  const handleSubmit = async (method: string, e: any) => {
    e.preventDefault();

    toggleOpen();
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/sneakers/${shoe._id}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedShoe),
      });

      window.location.reload();
    } catch (e: any) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <p className="h2">{shoe.name}</p>
      <form onSubmit={(e) => handleSubmit("PUT", e)} className="editMenuForm">
        <div className="upperForm">
          <TextField
            name="name"
            onChange={handleChange}
            label="Name"
            value={editedShoe.name}
          />
          <TextField
            name="brand"
            onChange={handleChange}
            label="Brand"
            value={editedShoe.brand}
          />
          <TextField
            name="price"
            onChange={handleChange}
            label="Price"
            value={editedShoe.price}
            type="number"
          />
          <TextField
            name="size"
            onChange={handleChange}
            label="Size US"
            value={editedShoe.size}
            type="number"
          />
          <TextField
            name="year"
            onChange={handleChange}
            label="Year"
            value={editedShoe.year}
            type="number"
          />
          <label className="label">
            Rate
            <div className="starsWrapper">
              <RatingStars editable rating={rating} onChange={setRating} />
            </div>
          </label>
        </div>
        <div className="editMenuButtons">
          <Button
            text={isLoading ? "Loading" : "Save"}
            buttonType="submit"
            state={
              isEqual(shoeWithoutId, editedShoe) || isLoading
                ? "disabled"
                : "default"
            }
          />
          <Button
            text="Delete"
            state="active"
            onClick={(e) => handleSubmit("DELETE", e)}
          />
        </div>
      </form>
    </>
  );
}

export default EditMenu;
