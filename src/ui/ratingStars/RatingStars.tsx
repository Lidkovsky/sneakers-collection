import React, { useState } from "react";
import starFilled from "../../images/star-filled.svg";
import starEmpty from "../../images/star-empty.svg";
import { SneakerInterfase } from "../../components/sneakersList/SneakersList";

interface Props {
  editable?: boolean;
  rating?: 0 | 1 | 2 | 3 | 4 | 5;
  onChange?: React.Dispatch<any>;
  error?: boolean;
}

function RatingStars({ editable = false, rating = 0, onChange, error }: Props) {
  const starsArr = new Array(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (onChange) onChange((index + 1) as 0 | 1 | 2 | 3 | 4 | 5);
  };
  const handleHover = (index: number) => {
    if (editable) setHoveredRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((item, index) => {
        const starSrc =
          index < (hoveredRating !== null ? hoveredRating : rating)
            ? starFilled
            : starEmpty;

        return (
          <img
            key={index}
            src={starSrc}
            alt="star icon"
            style={editable ? { cursor: "pointer" } : {}}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
          />
        );
      })}
      {error && <p className="errorMessage">Must be filled</p>}
    </div>
  );
}

export default RatingStars;
