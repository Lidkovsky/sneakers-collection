import "./styles.scss";
import trashIcon from "../../images/trash-icon.svg";
import { SneakerAPIInterfase } from "../../pages/main/Main";
import RatingStars from "../ratingStars/RatingStars";

interface Props {
  onDelete: any;
  className?: string;
  onTap: any;
  shoe: SneakerAPIInterfase;
}

function ItemCard({ shoe, onDelete, onTap, className }: Props) {
  return (
    <div className={"cardWrapper " + className} onClick={onTap}>
      <div className="topWrapper">
        <img
          src={trashIcon}
          alt="delete item"
          className="itemDelete"
          onClick={(e) => {
            // Stop event propagation to prevent onTap from triggering
            e.stopPropagation();
            onDelete();
          }}
        />
        <p className="itemName h3">{shoe.name}</p>
        <p className="itemBrand copy">{shoe.brand}</p>
        <div className="itemRating">
          <RatingStars rating={shoe.rating} editable={false} />
        </div>
      </div>
      <div className="bottomWrapper">
        <div className="bottomItem">
          <p className="subhead">{shoe.year}</p>
          <p className="copy">Year</p>
        </div>
        <span className="bottomBr" />
        <div className="bottomItem">
          <p className="subhead">{shoe.size}</p>
          <p className="copy">Size US</p>
        </div>
        <span className="bottomBr" />
        <div className="bottomItem">
          <p className="subhead">${shoe.price}</p>
          <p className="copy">Price</p>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
