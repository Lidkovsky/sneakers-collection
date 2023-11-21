import "./styles.scss";

interface Props {
  content: JSX.Element;
  imgUrl: string;
}

function EmptyList({ content, imgUrl }: Props) {
  return (
    <div className="emptyWrapper grid">
      <img className="emptyListImg" src={imgUrl} alt="search better image" />
      {content}
    </div>
  );
}

export default EmptyList;
