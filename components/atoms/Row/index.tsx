interface RowProps {
  name: string;
  showCards: boolean;
  card: number | null | string;
}

const Row: React.FC<RowProps> = ({ name, card, showCards }) => {
  const cardText = () => {
    if (showCards) {
      if (!card) return <>&#10006;</>;
      return card;
    }
    if (card) return <>&#10003;</>;

    return <>-</>;
  };
  return (
    <div className="flex flex-nowrap justify-between border-b-2 border-neutral-200">
      <div>{name}</div>
      <div>{cardText()}</div>
    </div>
  );
};

export default Row;
