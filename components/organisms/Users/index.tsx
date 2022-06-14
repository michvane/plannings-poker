import Container from "components/atoms/Container";
import Row from "components/atoms/Row";
import { User } from "types";
import styles from "./users.module.scss";

interface UsersProps {
  users: User[];
  showCards: boolean;
  handleShowCards: () => void;
  handleDeleteEstimations: () => void;
}

const Users: React.FC<UsersProps> = ({
  users,
  showCards,
  handleShowCards,
  handleDeleteEstimations,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleShowCards}>
          Show cards
        </button>
        <button className={styles.button} onClick={handleDeleteEstimations}>
          Delete estimations
        </button>
      </div>
      <div className={styles.userContainer}>
        {users.length > 0 &&
          users.map((user: User) => (
            <Row
              key={user.name}
              name={user.name}
              showCards={showCards}
              card={user.selectedCard}
            />
          ))}
      </div>
    </div>
  );
};

export default Users;
