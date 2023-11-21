import React, { useState, useEffect } from "react";
import ItemCard from "../../ui/itemCard/ItemCard";
import emptyListImg from "../../images/empty-list-img.png";
import searchBetterImg from "../../images/search-better.svg";
import "./styles.scss";
import SortBar from "../sortBar/SortBar";
import SerachResultFor from "../../ui/searchResultFor/SerachResultFor";
import SideMenu from "../sideMenu/SideMenu";
import EditMenu from "../editMenu/EditMenu";
export const BASE_URL =
  "https://crudcrud.com/api/c84c026862b5405abf12df960478ebd7";

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

function SneakersList(props: { searchQuery: string }) {
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [sneakersList, setSneakersList] = useState<SneakerAPIInterfase[]>([]);
  const [filteredList, setFilteredList] =
    useState<SneakerAPIInterfase[]>(sneakersList);
  const [isSideOpen, setIsSideOpen] = useState<boolean>(false);
  const [editableShoe, setEditedShoe] = useState<SneakerAPIInterfase>();
  useEffect(() => {
    if (!isSideOpen) {
      setEditedShoe(undefined);
    }
  }, [isSideOpen]);
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
        setFilteredList(sneakers);
      } catch (e: any) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSnekers();
  }, []);
  useEffect(() => {
    // Filter and set the filtered list based on search and filter conditions
    const filteredList = sneakersList
      .filter((sneaker) => {
        if (props.searchQuery === "") {
          return true;
        } else {
          return sneaker.name.toLowerCase().includes(props.searchQuery);
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
  }, [props.searchQuery, sneakersList, filter]);

  //HANDLE DELETE
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

  if (error) {
    //error state
    return <div>Something went wrong.</div>;
  } else if (isLoading) {
    //loading state
    return <div>Loading...</div>;
  } else if (sneakersList.length === 0) {
    return (
      <div className="emptyWrapper grid">
        <img
          className="emptyListImg"
          src={emptyListImg}
          alt="empty list image"
        />
        <p className="copy">
          Seem’s like you still didn’t add <br />
          any new sneaker to your collection
        </p>
      </div>
    );
  } else if (filteredList.length === 0) {
    return (
      <div className="emptyWrapper grid">
        <img
          className="emptyListImg"
          src={searchBetterImg}
          alt="search better image"
        />
        <p className="copy">
          Search better. <br />
          There is nothing like this in your collection.
        </p>
      </div>
    );
  }

  return (
    <div className="grid itemsWrapper">
      <div className="sortBarWrapper">
        {props.searchQuery !== "" && (
          <SerachResultFor
            query={props.searchQuery}
            amount={filteredList.length}
          />
        )}

        <SortBar setFilter={setFilter} filter={filter} />
      </div>
      {filteredList.map((item) => {
        return (
          <ItemCard
            className="shoeCard"
            shoe={item}
            key={item._id}
            onDelete={() => handleDelete(item._id)}
            onTap={() => {
              setEditedShoe(item);
              setIsSideOpen(!isSideOpen);
            }}
          />
        );
      })}

      <SideMenu
        isOpen={isSideOpen}
        toggleOpen={() => setIsSideOpen(!isSideOpen)}
      >
        {editableShoe && (
          <EditMenu
            shoe={editableShoe}
            toggleOpen={() => setIsSideOpen(!isSideOpen)}
          />
        )}
      </SideMenu>
    </div>
  );
}

export default SneakersList;
//success state
