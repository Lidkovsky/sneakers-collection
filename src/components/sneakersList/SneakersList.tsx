import { useState, useEffect } from "react";
import ItemCard from "../../ui/itemCard/ItemCard";
import "./styles.scss";
import SideMenu from "../sideMenu/SideMenu";
import EditMenu from "../editMenu/EditMenu";
import { SneakerAPIInterfase } from "../../pages/main/Main";

interface Props {
  sneakersList: SneakerAPIInterfase[];
  handleDelete: (id: string) => Promise<boolean | undefined>;
  error?: boolean;
  isLoading?: boolean;
}

function SneakersList({ sneakersList, handleDelete, error, isLoading }: Props) {
  const [isSideOpen, setIsSideOpen] = useState<boolean>(false);
  const [editableShoe, setEditedShoe] = useState<SneakerAPIInterfase>();
  useEffect(() => {
    if (!isSideOpen) {
      setEditedShoe(undefined);
    }
  }, [isSideOpen]);

  if (error) {
    //error state
    return <div>Something went wrong.</div>;
  } else if (isLoading) {
    //loading state
    return <div>Loading...</div>;
  }
  return (
    <div className="grid itemsWrapper">
      {sneakersList.map((item) => {
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
      {sneakersList.length > 0 && <div className="bottomButtonBg" />}
    </div>
  );
}

export default SneakersList;
