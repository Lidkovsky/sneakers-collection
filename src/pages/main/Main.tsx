import { useState } from "react";

import "./styles.scss";
import Button from "../../ui/button/Button";
import AddNewForm from "../../components/addNewForm/AddNewForm";
import SneakersList from "../../components/sneakersList/SneakersList";
import TextField from "../../ui/textField/TextField";
import plusIcon from "../../images/plus-icon.svg";
import SideMenu from "../../components/sideMenu/SideMenu";

function Main() {
  const [isSideOpen, setIsSideOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  function toggleOpen() {
    setIsSideOpen(!isSideOpen);
  }
  const randomShoe = {
    brand: "2",
    name: "2",
    price: 2,
    rating: 4 as 0 | 1 | 2 | 3 | 4 | 5,
    size: 2,
    year: 4444,
    _id: "655c7c2bf3272103e862d6e8",
  };
  return (
    <>
      {/* <Header /> */}
      <header className="globalWrapper grid headerWrapper">
        <h1>Your Collection</h1>
        <div className="searchWrapper">
          <TextField
            className="searchBar"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />
          <Button
            className="addNewButton"
            text="Add new sneakers"
            onClick={() => setIsSideOpen(!isSideOpen)}
            iconUrl={plusIcon}
          />
        </div>
      </header>

      <main className="globalWrapper mainWrapper">
        <SneakersList searchQuery={searchQuery} />

        {/* <AddNewForm
          isOpen={isSideOpen}
          toggleOpen={() => setIsSideOpen(!isSideOpen)}
        /> */}
        <SideMenu
          isOpen={isSideOpen}
          toggleOpen={() => setIsSideOpen(!isSideOpen)}
        >
          <AddNewForm toggleOpen={() => setIsSideOpen(!isSideOpen)} />
        </SideMenu>

        <Button
          className="addNewButtonBottom"
          text="Add new sneakers"
          onClick={() => setIsSideOpen(!isSideOpen)}
          iconUrl={plusIcon}
        />
      </main>
    </>
  );
}

export default Main;
