import Head from "next/head";
import Image from "next/image";
import Banner from "../components/banner";
import Card from "../components/card";
import styles from "../styles/Home.module.css";

export default function Home() {
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
        <div className={styles.cardLayout}>
          <Card
            name="DarkHorse Coffee"
            imgUrl="/static/hero-image.png"
            href="/coffee-store/darkhorse-coffee"
            className={styles.card}
          />
          <Card
            name="DarkHorse Coffee"
            imgUrl="/static/hero-image.png"
            href="/coffee-store/darkhorse-coffee"
            className={styles.card}
          />
        </div>
      </main>
    </>
  );
}
