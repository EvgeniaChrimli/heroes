import React from "react";
import { fetchAllHero } from "../components/Heroes/heroThunk";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { baseImgUrl } from "../constants/constants";
import { Link } from "react-router-dom";
import { removeHero } from "../redux/allHeroes/allHeroesSlice";
import del from "../assets/images/delet.svg";
import favorite from "../assets/images/favor.svg";
import styles from "../styles/HomePage.module.css";

const HomePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const heroes = useSelector((state: RootState) => state.allHeroesSlice.heroes);
  const [active, setActive] = React.useState<number[]>(() => {
    const storageLikes = localStorage.getItem("likedHeroes");
    return storageLikes ? JSON.parse(storageLikes) : [];
  });
  const [filter, setFilter] = React.useState<"all" | "favorites">("all");

  const [currentPage, setCurrentPage] = React.useState(1);
  const ITEMS_PER_PAGE = 10;

  const handlePgeChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(heroes.length / ITEMS_PER_PAGE);

  const handleClick = (id: number) => {
    setActive((prev) =>
      prev.includes(id) ? prev.filter((heroId) => heroId !== id) : [...prev, id]
    );
  };

  const remove = (id: number) => {
    const findFavorite = localStorage.getItem("likedHeroes");
    const parse = findFavorite ? JSON.parse(findFavorite) : [];
    const updateFavorites = parse.filter((itemId: number) => itemId !== id);
    localStorage.setItem("likedHeroes", JSON.stringify(updateFavorites));
    setActive((prev) => prev.filter((heroId) => heroId !== id));

    setActive(updateFavorites);
    if (!updateFavorites.includes(id)) {
      dispatch(removeHero(id));
    }
  };

  React.useEffect(() => {
    localStorage.setItem("likedHeroes", JSON.stringify(active));
  }, [active]);

  const filteredHeroes = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentPageHeroes = heroes.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );

    if (filter === "favorites") {
      return currentPageHeroes.filter((hero) => active.includes(hero.id));
    }

    return currentPageHeroes;
  }, [heroes, currentPage, active, filter]);

  React.useEffect(() => {
    dispatch(fetchAllHero());
  }, [dispatch]);
  return (
    <section className={styles.allPersons}>
      <div className={styles.container}>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "all" | "favorites")}
        >
          <option value="all">Все персонажи</option>
          <option value="favorites">Избранные</option>
        </select>
        <div className={styles.gradient}></div>
        <div className={styles.gradient2}></div>

        <div className={styles.row}>
          <ul className={styles.list}>
            {filteredHeroes.map((item) => (
              <li key={item.id} className={styles.item}>
                <img
                  className={styles.img}
                  src={baseImgUrl + item.img}
                  alt="heroImage"
                />
                <Link className={styles.link} to={`/hero/${item.id}`}>
                  <span className={styles.name}>{item.localized_name}</span>
                </Link>
                <span className={styles.roles}>
                  Base health:{item.base_health}
                </span>

                <div className={styles.btnContainer}>
                  <img
                    src={favorite}
                    alt="like"
                    onClick={() => handleClick(item.id)}
                    className={
                      active.includes(item.id) ? styles.svgActive : styles.svg
                    }
                  />

                  <img
                    src={del}
                    onClick={() => remove(item.id)}
                    className={styles.svg}
                    alt="delete"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.navBtn}>
          <button
            onClick={() => handlePgeChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.btn}
          >
            Назад
          </button>
          <button
            onClick={() => handlePgeChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.btn}
          >
            Вперед
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
