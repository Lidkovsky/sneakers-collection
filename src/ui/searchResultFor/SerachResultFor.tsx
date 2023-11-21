import "./styles.scss";

interface Props {
  query: string;
  amount: number;
}

function SerachResultFor({ query, amount }: Props) {
  return (
    <div className="searchResultFor">
      <p className="searchResLabel">Search result for:</p>
      <p className="h3">
        {query} ({amount})
      </p>
    </div>
  );
}

export default SerachResultFor;
