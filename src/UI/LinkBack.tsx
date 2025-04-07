import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LinkBack.module.css";

const LinkBack = () => {
  const navigate = useNavigate();
  const handleBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    navigate(-1);
  };
  return (
    <button className={styles.link} onClick={handleBack}>
      Назад
    </button>
  );
};

export default LinkBack;
