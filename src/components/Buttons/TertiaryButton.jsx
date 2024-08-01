import Link from "next/link";
import styles from "../../styles/TertiaryButton.module.css";

const TertiaryButton = ({ title, url }) => {
  return (
    <button className={`${styles.button} ${styles.learnMore}`}>
      <Link href={`${url}`} target="_blank">
        <span className={styles.circle} aria-hidden="true">
          <span className={`${styles.icon} ${styles.arrow}`}></span>
        </span>
        <span className={styles.buttonText}>{title}</span>
      </Link>
    </button>
  );
};

export default TertiaryButton;
