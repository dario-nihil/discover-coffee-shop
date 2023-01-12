import Head from "next/head";
import Banner from "../components/banner";
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
      </main>
    </>
  );
}
