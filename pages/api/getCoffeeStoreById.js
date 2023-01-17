import { findRecordByFilter } from "../../lib/airtable";

const handler = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const records = await findRecordByFilter(id);

      if (records.length !== 0) {
        res.json({ message: "Return existing record", records });
      } else {
        res.status(404).json({ message: `id could not be found - ${id}` });
      }
    } else {
      res.status(500).json({ message: "Id is missing" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export default handler;
