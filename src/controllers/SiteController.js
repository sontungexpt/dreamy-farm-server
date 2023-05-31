class SiteController {
  index(req, res, next) {
    // .. some logic here .. like any other middleware
    res.send('index');
    next();
  }

  search(req, res, next) {
    // .. some logic here .. like any other middleware
    res.send('search');
    next();
  }
}

export default SiteController;
