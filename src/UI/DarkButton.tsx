import React from "react";
import styles from "../styles/DarkButton.module.css";

interface DarkButtonProps {
  name: string;
}

const DarkButton: React.FC<DarkButtonProps> = ({ name }) => {
  return <button className={styles.darkBtn}>{name}</button>;
};

export default DarkButton;
