import clsx from 'clsx';
import styles from './card.module.scss';

interface CardProps {
  selectCardHandler: (card: string) => void;
  selectedCard: string | null;
}

const cards = ['?', '0', '1', '2', '3', '5', '8'];

const Cards: React.FC<CardProps> = ({ selectCardHandler, selectedCard }) => {
  return (
    <div className={styles.grid}>
      {cards.map((card, i) => (
        <div
          key={`key-${card}-${i}`}
          className={clsx([
            styles.card,
            selectedCard === card && styles.selected,
          ])}
          onClick={() => selectCardHandler(card)}
        >
          {card}
        </div>
      ))}
    </div>
  );
};
export default Cards;
