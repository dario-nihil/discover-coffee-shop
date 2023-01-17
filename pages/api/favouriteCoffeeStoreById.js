import { findRecordByFilter } from "../../lib/airtable";

const handle = async (req, res) => {
  if (req.method === "PUT") {
    const { id } = req.body;

    try {
      if (id) {
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
          res.json({ message: "Return existing record", records });
        } else {
          res
            .status(500)
            .json({ message: "Coffee store id doesn't exist!", id });
        }
        res.status(200).json({ message: "This Works!", id });
      } else {
        res.status(400).json({ message: "Id is missing!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error upvoting coffee store", error });
    }
  }
};

export default handle;
