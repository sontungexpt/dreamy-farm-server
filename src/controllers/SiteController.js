class SiteController {
  index(req, res, next) {
    // .. some logic here .. like any other middleware
    next();
  }
}

export default SiteController;
