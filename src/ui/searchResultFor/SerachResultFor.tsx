import "./styles.scss";

interface Props {
  query: string;
  amount: number;
  className?: string;
}

function SerachResultFor({ className, query, amount }: Props) {
  return (
    <div className={"searchResultFor " + className}>
      <p className="searchResLabel">Search result for:</p>
      <p className="h3">
        {query} ({amount})
      </p>
    </div>
  );
}

export default SerachResultFor;
