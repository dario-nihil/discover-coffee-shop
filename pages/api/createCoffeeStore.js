const Airtable = require("airtable");

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("coffee-stores");

export const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const findCoffeeStoreRecords = await table
        .select({
          filterByFormula: "id = '0'",
        })
        .firstPage();

      if (findCoffeeStoreRecords.length !== 0) {
        const records = findCoffeeStoreRecords.map((record) => ({
          ...record.fields,
        }));
        console.log(records);
        res.json({ records });
      } else {
        res.json({ message: "create a record" });
      }
    } catch (error) {
      console.log("Error finding store", error);
      res.status(500).json({ message: "Error finding store", error });
    }
  }
};

export default handler;
