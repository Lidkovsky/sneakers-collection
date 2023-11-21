import TextInput from "../textInput/TextInput";
import searchIcon from "../../images/search-icon.svg";
import "./styles.scss";
interface Props {
  className?: string;
  value: string;
  onChange: any;
}
function SearchBar({ className, value, onChange }: Props) {
  return (
    <div className={"searchBar"}>
      <img src={searchIcon} alt="search icon" />
      <TextInput
        className="copy"
        value={value}
        placeholder="Search"
        onChange={onChange}
      />
    </div>
  );
}

export default SearchBar;
