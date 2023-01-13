import Image from "next/image";
import Link from "next/link";
import cls from "classnames";

import styles from "./card.module.css";

const Card = ({ name, href, imgUrl }) => {
  return (
    <Link href={href} className={styles.cardLink}>
      <div className={cls("glass", styles.container)}>
        <div className={styles.cardHeaderWrapper}>
          <h2 className={styles.cardHeader}>{name}</h2>
        </div>
        <div className={styles.cardImageWrapper}>
          <Image
            className={styles.cardImage}
            src={imgUrl}
            alt={name}
            width={260}
            height={160}
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
