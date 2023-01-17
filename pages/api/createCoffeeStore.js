import {
  table,
  getMinifiedRecords,
  findRecordByFilter,
} from "../../lib/airtable";

export const handler = async (req, res) => {
  if (req.method === "POST") {
    const { id, name, neighbourhood, address, imgUrl, voting } = req.body;

    try {
      if (id) {
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
          res.json({ message: "Return existing record", records });
        } else {
          if (name) {
            const createRecord = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighbourhood,
                  voting,
                  imgUrl,
                },
              },
            ]);
            const records = getMinifiedRecords(createRecord);
            res.json({ message: "create a record", records });
          } else {
            res.status(400).json({ message: "Id or name is missing!" });
          }
        }
      } else {
        res.status(400).json({ message: "Id is missing!" });
      }
    } catch (error) {
      console.log("Error creating or finding store", error);
      res
        .status(500)
        .json({ message: "Error creating or finding store", error });
    }
  }
};

export default handler;
