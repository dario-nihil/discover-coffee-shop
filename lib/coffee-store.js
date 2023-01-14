import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLng, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLng}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 30,
  });

  const unsplashResults = photos.response.results;

  return unsplashResults.map((result) => result.urls.small);
};

export const fetchCoffeStore = async (
  latLng = "45.466624701571995,10.53598211596166",
  limit = 6
) => {
  const photos = await getListOfCoffeeStorePhotos();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(latLng, "coffee", limit),
    options
  );

  const data = await response.json();

  return data.results.map((result, idx) => ({
    id: result.fsq_id,
    address: result.location.address,
    name: result.name,
    neighborhood:
      result.location.neighborhood && result.location.neighborhood.length > 0
        ? result.location.neighborhood[0]
        : "",
    imgUrl: photos && photos.length > 0 ? photos[idx] : null,
  }));
};
