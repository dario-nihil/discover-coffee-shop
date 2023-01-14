import Head from "next/head";
import Image from "next/image";
import Banner from "../components/banner";
import Card from "../components/card";

import styles from "../styles/Home.module.css";

export default function Home({ coffeStores }) {
  const handleOnBannerClick = () => {
    console.log("Hi banner button");
  };

  return (
    <>
      <Head>
        <title>Coffe Conoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerClick}
        />
        <Image
          className={styles.heroImage}
          src="/static/hero-image.png"
          alt="A lady with a cup of coffee"
          width={700}
          height={400}
        />

        {coffeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto stores</h2>
            <div className={styles.cardLayout}>
              {coffeStores.map((coffeStore) => (
                <Card
                  key={coffeStore.fsq_id}
                  name={coffeStore.name}
                  imgUrl={
                    coffeStore.imgUrl ||
                    "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                  }
                  href={`/coffee-store/${coffeStore.id}`}
                  className={styles.card}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    "https://api.foursquare.com/v3/places/search?query=coffee&ll=43.64969895162279%2C-79.37632948459212&limit=6",
    options
  );

  const data = await response.json();

  return {
    props: { coffeStores: data.results },
  };
};
