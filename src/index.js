import express from "express";
import morgan from "morgan";
import properties from "~/configs";
import route from "~/routes";

const app = express();
const PORT = process.env.PORT || properties.PORT;

app.use(morgan("combined"));

route(app);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
