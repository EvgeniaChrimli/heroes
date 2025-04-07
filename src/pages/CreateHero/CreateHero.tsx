import React from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { addCard } from "../../redux/createHero/createHeroSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import styles from "../../styles/CreateHero.module.css";
import LinkBack from "../../UI/LinkBack";

const CreateHero = () => {
  const dispatch: AppDispatch = useDispatch();
  const customHeroes = useSelector(
    (state: RootState) => state.createHeroSlice.customHeroes
  );

  interface HeroFormData {
    id: number;
    name: string;
    role: string;
    speed: number;
  }

  const [formData, setFormData] = React.useState<HeroFormData>({
    id: 0,
    name: "",
    role: "",
    speed: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newHero: HeroFormData = {
      id: Math.floor(Math.random() * 1000),
      name: formData.name,
      role: formData.role,
      speed: formData.speed,
    };
    if (!formData.name && !formData.role && !formData.speed) {
      alert("Введите данные!");
    }
    const find = customHeroes.some(
      (item) => item.id === newHero.id || item.name === newHero.name
    );
    if (find) {
      alert("такой герой существует");
    } else {
      dispatch(addCard(newHero));
      formData.name = "";
      formData.role = "";
      formData.speed = 0;
    }
  };

  return (
    <>
      <Header />
      <section className={styles.sectionForm}>
        <LinkBack />
        <div className={styles.gradient}></div>
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Введите имя"
            />
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={styles.input}
              placeholder="Введите роль"
            />

            <input
              type="number"
              name="speed"
              value={formData.speed}
              onChange={handleChange}
              className={styles.input}
              placeholder="Введите скорость"
            />
            <button className={styles.button} type="submit">
              Создать героя
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default CreateHero;
