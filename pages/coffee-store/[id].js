import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import coffeStores from "../../data/coffee-stores.json";

const CoffeeStore = ({ coffeStore: { address, name, neighbourhood } }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href="/">Back to home</Link>
      <p>{address}</p>
      <p>{name}</p>
      <p>{neighbourhood}</p>
    </>
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
