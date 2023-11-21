import { useEffect, useState } from "react";
import "./styles.scss";
import Button from "../../ui/button/Button";
import AddNewForm from "../../components/addNewForm/AddNewForm";
import SneakersList from "../../components/sneakersList/SneakersList";
import plusIcon from "../../images/plus-icon.svg";
import SideMenu from "../../components/sideMenu/SideMenu";
import SearchBar from "../../ui/serachBar/SearchBar";
import SortBar from "../../components/sortBar/SortBar";
import EmptyList from "../../ui/emptyList/EmptyList";
import emptyListImg from "../../images/empty-list-img.png";
import searchBetterImg from "../../images/search-better.svg";
import SerachResultFor from "../../ui/searchResultFor/SerachResultFor";

export const BASE_URL =
  "https://crudcrud.com/api/353afb726bb34873b9731cb324e7fc86";

export interface SneakerInterfase {
  name: string;
  brand: string;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  year: number;
  size: number;
  price: number;
}

export interface SneakerAPIInterfase extends SneakerInterfase {
  _id: string;
}

function Main() {
  const [isSideOpen, setIsSideOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter, setFilter] = useState<string | undefined>(undefined);

  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [sneakersList, setSneakersList] = useState<SneakerAPIInterfase[]>([]);
  const [filteredList, setFilteredList] =
    useState<SneakerAPIInterfase[]>(sneakersList);

  //INITIAL FETCH
  useEffect(() => {
    async function fetchSnekers() {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/sneakers`, {
          method: "GET",
        });

        const sneakers = await response.json();
        setSneakersList(sneakers.reverse());
      } catch (e: any) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSnekers();
  }, []);

  // HANDLE DELETE
  const handleDelete = async (id: string) => {
    //save a sneaker in case fetch failed
    let removedEl = {
      sneaker: sneakersList.find((sneaker) => sneaker._id === id),
      index: sneakersList.findIndex((sneaker) => sneaker._id),
    };
    try {
      //remove before fetch so UI updates faster
      setSneakersList(
        sneakersList.filter((object) => {
          return object._id !== id;
        })
      );

      const response = await fetch(`${BASE_URL}/sneakers/${id}`, {
        method: "DELETE",
      });

      return response.ok;
    } catch (e: any) {
      setError(e);
      //return sneaker in case there's an error
      if (removedEl.sneaker)
        setSneakersList(
          sneakersList.splice(removedEl.index, 0, removedEl.sneaker)
        );
    }
  };

  //HANDLE FILTERS
  useEffect(() => {
    // Filter and set the filtered list based on search and filter conditions
    const filteredList = sneakersList
      .filter((sneaker) => {
        if (searchQuery === "") {
          return true;
        } else {
          return sneaker.name.toLowerCase().includes(searchQuery);
        }
      })
      .sort((a, b) => {
        switch (filter) {
          case "size":
            return a.size - b.size;
          case "year":
            return b.year - a.year;
          case "price":
            return a.price - b.price;
          default:
            return 0;
        }
      });

    setFilteredList(filteredList);
  }, [searchQuery, sneakersList, filter]);

  return (
    <>
      <header className="globalWrapper grid headerWrapper">
        <h1>Your Collection</h1>
        {filteredList.length > 0 && (
          <SortBar className="sortBar" setFilter={setFilter} />
        )}

        <div className="searchWrapper">
          <SearchBar
            className="searchBar"
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value.toLowerCase())}
          />

          <Button
            className="addNewButton"
            text="Add new sneakers"
            onClick={() => setIsSideOpen(!isSideOpen)}
            iconUrl={plusIcon}
          />
        </div>
        {filteredList.length > 0 && searchQuery.length > 0 && (
          <SerachResultFor
            className="searchFor"
            amount={filteredList.length}
            query={searchQuery}
          />
        )}
      </header>

      <main className="globalWrapper mainWrapper">
        {sneakersList.length === 0 ? (
          <EmptyList
            content={
              <p className="copy">
                Seem’s like you still didn’t add <br />
                any new sneaker to your collection
              </p>
            }
            imgUrl={emptyListImg}
          />
        ) : filteredList.length === 0 ? (
          <EmptyList
            content={
              <p className="copy">
                Search better. <br />
                There is nothing like this in your collection.
              </p>
            }
            imgUrl={searchBetterImg}
          />
        ) : (
          <SneakersList
            handleDelete={handleDelete}
            sneakersList={filteredList}
            error={error}
            isLoading={isLoading}
          />
        )}

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
