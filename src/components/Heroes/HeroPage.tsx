import React from "react";
import { useParams } from "react-router-dom";
import { Hero } from "./heroTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchAllHero } from "./heroThunk";
import LinkBack from "../../UI/LinkBack";

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
    return <p>Загрузка...</p>;
  }
  return (
    <div>
      <p>{hero.localized_name}</p>
      <LinkBack />
    </div>
  );
};

export default HeroPage;
