import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";

import { StoreContext, ACTION_TYPES } from "../store/store-context";
import Banner from "../components/banner";
import Card from "../components/card";
import { fetchCoffeStore } from "../lib/coffee-store";
import useTrackLocation from "../hooks/use-track-location";

import styles from "../styles/Home.module.css";

export default function Home(props) {
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  const [coffeeStoresError, setCoffeeStoresError] = useState(null);
  const {
    dispatch,
    state: { coffeeStores, latLng },
  } = useContext(StoreContext);

  useEffect(() => {
    (async function setCoffeeStoresByLocation() {
      if (latLng) {
        try {
          const response = await fetch(
            `/api/getCoffeeStoresByLocation?latLng=${latLng}&limit=30`
          );
          const fetchedCoffeStores = await response.json();

          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: { coffeeStores: fetchedCoffeStores },
          });

          setCoffeeStoresError("");
        } catch (error) {
          setCoffeeStoresError(error.message);
        }
      }
    })();
  }, [latLng, dispatch]);

  const handleOnBannerClick = () => {
    handleTrackLocation();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffe Conoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleOnClick={handleOnBannerClick}
        />
        {locationErrorMsg && <p>`Something went wrong: {locationErrorMsg}`</p>}
        {coffeeStoresError && (
          <p>`Something went wrong: {coffeeStoresError}`</p>
        )}
        <Image
          className={styles.heroImage}
          priority="true"
          src="/static/hero-image.png"
          alt="A lady with a cup of coffee"
          width={700}
          height={400}
        />

        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Stores near me</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeeStore) => (
                <Card
                  key={coffeeStore.id}
                  name={coffeeStore.name}
                  imgUrl={
                    coffeeStore.imgUrl ||
                    "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                  }
                  href={`/coffee-store/${coffeeStore.id}`}
                  className={styles.card}
                />
              ))}
            </div>
          </div>
        )}

        <div className={styles.sectionWrapper}>
          {props.coffeeStores.length > 0 && (
            <>
              <h2 className={styles.heading2}>Desenzano stores</h2>
              <div className={styles.cardLayout}>
                {props.coffeeStores.map((coffeeStore) => {
                  return (
                    <Card
                      key={coffeeStore.id}
                      name={coffeeStore.name}
                      imgUrl={
                        coffeeStore.imgUrl ||
                        "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                      }
                      href={`/coffee-store/${coffeeStore.id}`}
                      className={styles.card}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const coffeeStores = await fetchCoffeStore();

  return {
    props: { coffeeStores },
  };
};
