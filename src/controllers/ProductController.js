class ProductController {
  vegetables(req, res, next) {
    // .. some logic here .. like any other middleware
    res.send("vegetables");
    next();
  }

  herbs_armatics(req, res, next) {
    // .. some logic here .. like any other middleware
    res.send("herbs_armatics");
    next();
  }

  frozen(req, res, next) {
    // .. some logic here .. like any other middleware
    res.send("frozen");
    next();
  }
  meat_seafood(req, res, next) {
    // .. some logic here .. like any other middleware
    res.send("meat_seafood");
    next();
  }

  dairy_eggs(req, res, next) {
    // .. some logic here .. like any other middleware
    res.send("dairy_eggs");
    next();
  }

  index(req, res, next) {
    // .. some logic here .. like any other middleware
    res.send("fruits");
    next();
  }
}

export default ProductController;
