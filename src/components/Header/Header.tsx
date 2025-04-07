import { Link } from "react-router-dom";
import styles from "../../styles/Header.module.css";

const Header = () => {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.logo}>
            <Link className={styles.link} to="/">
              Logo
            </Link>
          </div>
          <div>
            <Link className={styles.link} to="/create">
              Создать нового персонажа
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
