import {
  findRecordByFilter,
  table,
  getMinifiedRecords,
} from "../../lib/airtable";

const handle = async (req, res) => {
  if (req.method === "PUT") {
    const { id } = req.body;

    try {
      if (id) {
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
          const record = records[0];
          const calculateVoting = parseInt(record.voting) + 1;

          const updatedRecord = await table.update([
            {
              id: record.recordId,
              fields: {
                voting: calculateVoting,
              },
            },
          ]);

          if (updatedRecord) {
            const minifiedRecord = getMinifiedRecords(updatedRecord);
            res.json({
              message: "Return updated record",
              record: minifiedRecord,
            });
          }
        } else {
          res
            .status(500)
            .json({ message: "Coffee store id doesn't exist!", id });
        }
      } else {
        res.status(400).json({ message: "Id is missing!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error upvoting coffee store", error });
    }
  }
};

export default handle;
