const handler = (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      res.status(201).json({ message: `id is created ${id}` });
    } else {
      res.status(500).json({ message: "Id is missing" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export default handler;
