const Airtable = require("airtable");

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

export const table = base("coffee-stores");

const getMinifiedRecord = (record) => {
  return { ...record.fields };
};

export const getMinifiedRecords = (recors) => {
  return recors.map((record) => getMinifiedRecord(record));
};
