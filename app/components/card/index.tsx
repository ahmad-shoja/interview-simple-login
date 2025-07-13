import React from "react";
import styles from "./index.module.sass";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return <div className={`${styles.card} ${className || ""}`}>{children}</div>;
};

export default Card;
