import React from "react";
import { useParams } from "react-router-dom";
import { Hero } from "./heroTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchAllHero } from "./heroThunk";
import LinkBack from "../../UI/LinkBack";
import { baseImgUrl } from "../../constants/constants";
import donkey from "../../assets/images/imageMain.png";
import styles from "../../styles/HeroPage.module.css";

const HeroPage = () => {
  const { id } = useParams();
  const [hero, setHero] = React.useState<Hero | null>(null);

  const heroes = useSelector((state: RootState) => state.allHeroesSlice.heroes);
  console.log(hero);

  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    if (heroes.length === 0) {
      dispatch(fetchAllHero());
    }
  }, [dispatch, heroes.length]);

  React.useEffect(() => {
    if (heroes.length > 0 && id) {
      const found = heroes.find((item) => item.id === Number(id));
      console.log(id);
      if (found) setHero(found);
    }
  }, [heroes, id]);

  if (!hero) {
    return <p className={styles.load}>Загрузка...</p>;
  }
  return (
    <section className={styles.heroSection}>
      <div className={styles.gradient}></div>
      <div className={styles.link}>
        <LinkBack />
      </div>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.info}>
            <div className={styles.text}>
              <p>Name: {hero.localized_name}</p>
              <p>Attack type: {hero.attack_type}</p>
              <p>Base mana: {hero.base_mana}</p>
              <p>Base health: {hero.base_health}</p>
              <p>Base attack min: {hero.base_attack_min}</p>
              <p>Base attack max: {hero.base_attack_max}</p>
            </div>
            <div className={styles.imgContainer}>
              <img
                className={styles.img}
                src={baseImgUrl + hero.icon}
                alt="image"
              />
            </div>
          </div>
          <img className={styles.donkey} src={donkey} alt="donkeyImg" />
        </div>
      </div>
    </section>
  );
};

export default HeroPage;
