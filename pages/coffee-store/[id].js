import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import cls from "classnames";
import { fetchCoffeStore } from "../../lib/coffee-store";

import styles from "../../styles/coffe-stores.module.css";

const CoffeeStore = ({
  coffeeStore: { name, address, neighborhood, imgUrl },
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
            <Link href="/">←Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            className={styles.storeImg}
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            alt={name}
            width={600}
            height={360}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/places.svg"
                alt=""
                width="24"
                height="24"
              />
              <p className={styles.text}>{address}</p>
            </div>
          )}
          {neighborhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                alt=""
                width="24"
                height="24"
              />
              <p className={styles.text}>{neighborhood}</p>
            </div>
          )}
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

export const getStaticProps = async (context) => {
  const { params } = context;
  const coffeeStores = await fetchCoffeStore();

  return {
    props: {
      coffeeStore: coffeeStores.find(
        (coffeeStore) => coffeeStore.id === params.id
      ),
    },
  };
};

export const getStaticPaths = async () => {
  const coffeeStores = await fetchCoffeStore();

  const paths = coffeeStores.map((coffeeStore) => ({
    params: { id: coffeeStore.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default CoffeeStore;
