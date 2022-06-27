import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './nav.module.scss';

const INITIAL_BUTTON_TEXT = 'Link room';

const Nav: React.FC = () => {
  const [buttonText, setButtonText] = useState(INITIAL_BUTTON_TEXT);
  const router = useRouter();
  const handleClick = () => {
    navigator.clipboard.writeText(
      `${window.location.host}/?room=${router.query.room}`,
    );
    setButtonText('Room copied!');
    const timer = setTimeout(() => {
      setButtonText(INITIAL_BUTTON_TEXT);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  };

  return (
    <div className={styles.navWrapper}>
      <nav className={styles.nav}>
        <div className={styles.title} onClick={() => router.push('/')}>
          MoonPay Planning Poker
        </div>
        <button onClick={handleClick}>{buttonText}</button>
      </nav>
    </div>
  );
};

export default Nav;
