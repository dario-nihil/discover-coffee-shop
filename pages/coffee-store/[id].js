import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import cls from "classnames";
import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../store/store-context";
import useSWR from "swr";

import { isEmpty } from "../../utils";
import { fetchCoffeStore } from "../../lib/coffee-store";

import styles from "../../styles/coffe-stores.module.css";

const CoffeeStore = ({ initialCoffeeStore }) => {
  const router = useRouter();
  const [coffeeStore, setCoffeeStore] = useState(initialCoffeeStore);
  const [votingCount, setVotingCount] = useState(0);
  const id = router.query.id;

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, (url) =>
    fetch(url).then((res) => res.json())
  );

  const handleCreateCoffeeStore = async (coffeStore) => {
    try {
      const { id, name, address, neighborhood, imgUrl, voting } = coffeStore;

      const response = await fetch("/api/createCoffeeStore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          address: address || "",
          voting: 0,
          imgUrl,
          neighborhood: neighborhood || "",
        }),
      });

      const dbCoffeeStore = await response.json();
      console.log(dbCoffeeStore);
    } catch (error) {
      console.error("Error creating coffee store", error);
    }
  };

  useEffect(() => {
    let selectedCoffeeStore;
    if (isEmpty(initialCoffeeStore) && coffeeStores.length > 0) {
      selectedCoffeeStore = coffeeStores.find(
        (coffeeStore) => coffeeStore.id === id
      );
    } else {
      selectedCoffeeStore = initialCoffeeStore;
    }

    if (selectedCoffeeStore) {
      setCoffeeStore(selectedCoffeeStore);
      handleCreateCoffeeStore(selectedCoffeeStore);
    }
  }, [coffeeStores, id, initialCoffeeStore]);

  useEffect(() => {
    if (data && data.records.length > 0) {
      console.log("data from SWR");
      setCoffeeStore(data.records[0]);
      setVotingCount(data.records[0].voting);
    }
  }, [data]);

  if (error) {
    return <div>Something went wrong retrieving coffee store page</div>;
  }

  const { name, address, neighborhood, imgUrl } = coffeeStore;

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  const handleUpvoteButton = () => {
    setVotingCount((count) => count + 1);
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
            <p className={styles.text}>{votingCount}</p>
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

  const findCoffeeStoreById = coffeeStores.find(
    (coffeeStore) => coffeeStore.id === params.id
  );

  return {
    props: {
      initialCoffeeStore: findCoffeeStoreById ?? {
        name: "",
        address: "",
        neighborhood: "",
      },
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
