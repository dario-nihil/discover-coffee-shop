import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import cls from "classnames";

import styles from "../../styles/coffe-stores.module.css";

import coffeStores from "../../data/coffee-stores.json";
import Image from "next/image";

const CoffeeStore = ({
  coffeStore: { address, name, neighbourhood, imgUrl },
}) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  const handleUpvoteButton = () => {
    console.log("handle upvote");
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            className={styles.storeImg}
            src={imgUrl}
            alt={name}
            width={600}
            height={360}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              alt=""
              width="24"
              height="24"
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              alt=""
              width="24"
              height="24"
            />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" alt="" width="24" height="24" />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = (context) => {
  const { params } = context;

  return {
    props: {
      coffeStore: coffeStores.find(
        (coffeeStore) => coffeeStore.id === +params.id
      ),
    },
  };
};

export const getStaticPaths = () => {
  const paths = coffeStores.map((coffeStore) => ({
    params: { id: coffeStore.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default CoffeeStore;
