import Image from "next/image";
import Link from "next/link";

import styles from "./card.module.css";

const Card = ({ name, href, imgUrl }) => {
  return (
    <Link href={href}>
      <h2>{name}</h2>
      <Image src={imgUrl} alt={name} width={260} height={160} />
    </Link>
  );
};

export default Card;
