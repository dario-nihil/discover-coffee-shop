import { fetchCoffeStore } from "../../lib/coffee-store";

const handler = async (req, res) => {
  const { latLng, limit } = req.query;

  try {
    const response = await fetchCoffeStore(latLng, limit);
    res.status(200).json(response);
  } catch (error) {
    console.log("There is an error", error);
    res.status(500).json({ message: "Something went wrong!", error });
  }
};

export default handler;
