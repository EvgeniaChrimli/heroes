import { Link } from "react-router-dom";
import DarkButton from "../../UI/DarkButton";
import styles from "../../styles/Header.module.css";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.logo}>
          <Link className={styles.link} to="/">
            Logo
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <DarkButton name="Домой" />
            </li>
            <li className={styles.item}>
              <DarkButton name="Матчи" />
            </li>
            <li className={styles.item}>
              <DarkButton name="Рейтинг" />
            </li>
          </ul>
        </nav>
        <div>
          <Link className={styles.link} to="/create">
            Создать нового персонажа
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
