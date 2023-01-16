const Airtable = require("airtable");

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("coffee-stores");

export const handler = async (req, res) => {
  if (req.method === "POST") {
    const { id, name, neighbourhood, address, imgUrl, voting } = req.body;

    try {
      const findCoffeeStoreRecords = await table
        .select({
          filterByFormula: `id = '${id}'`,
        })
        .firstPage();

      if (findCoffeeStoreRecords.length !== 0) {
        const records = findCoffeeStoreRecords.map((record) => ({
          ...record.fields,
        }));
        res.json({ message: "Return existing record", records });
      } else {
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
        const records = createRecord.map((record) => ({ ...record.fields }));
        res.json({ message: "create a record", records });
      }
    } catch (error) {
      console.log("Error finding store", error);
      res.status(500).json({ message: "Error finding store", error });
    }
  }
};

export default handler;
