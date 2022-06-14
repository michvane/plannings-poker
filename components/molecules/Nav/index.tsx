import Typography from "components/Typography";
import { useRouter } from "next/router";
import styles from "./nav.module.scss";

const Nav: React.FC = () => {
  const router = useRouter();
  console.log(router);
  const handleClick = () => {
    navigator.clipboard.writeText(
      `${window.location.host}/?room=${router.query.room}`
    );
  };
  return (
    <div className={styles.navWrapper}>
      <nav className={styles.nav}>
        <div className={styles.title}>MoonPay Planning Poker</div>
        <button onClick={handleClick}>Link room</button>
      </nav>
    </div>
  );
};

export default Nav;
