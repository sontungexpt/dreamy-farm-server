import express from "express";
import morgan from "morgan";
import properties from "~/configs/properties";
const app = express();
const PORT = process.env.PORT || properties.PORT;

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
