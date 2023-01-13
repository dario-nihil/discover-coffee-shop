import Head from "next/head";
import Image from "next/image";
import Banner from "../components/banner";
import Card from "../components/card";
import coffeStores from "../data/coffee-stores.json";
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
                  key={coffeStore.id}
                  name={coffeStore.name}
                  imgUrl={coffeStore.imgUrl}
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
  return {
    props: { coffeStores },
  };
};
