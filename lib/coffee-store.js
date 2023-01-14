const getUrlForCoffeeStores = (latLng, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLng}&${limit}=6`;
};

export const fetchCoffeStore = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(
      "43.64969895162279%2C-79.37632948459212",
      "coffee",
      6
    ),
    options
  );

  const data = await response.json();

  return data.results;
};
