import Head from "next/head";
import Image from "next/image";
import Banner from "../components/banner";
import Card from "../components/card";
import { fetchCoffeStore } from "../lib/coffee-store";
import useTrackLocation from "../hooks/use-track-location";

import styles from "../styles/Home.module.css";

export default function Home({ coffeeStores }) {
  const { handleTrackLocation, latLng, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  console.log({ latLng, locationErrorMsg });

  const handleOnBannerClick = () => {
    console.log("Hi banner button");
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
        <Image
          className={styles.heroImage}
          src="/static/hero-image.png"
          alt="A lady with a cup of coffee"
          width={700}
          height={400}
        />

        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Toronto stores</h2>
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
