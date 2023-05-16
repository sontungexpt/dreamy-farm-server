import productRouter from "./product";

function route(app) {
  app.use("/product", productRouter);
}

export default route;
