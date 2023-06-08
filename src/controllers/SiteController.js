import Product from '~/models/Product';
import Recipe from '~/models/Recipe';

class SiteController {
  index(req, res, next) {
    // .. some logic here .. like any other middleware
    res.send('index');
    next();
  }

  searchAtModel = async ({
    keySearch,
    sort, // sort = 'sold,desc' => sort = ['sold', 'desc'] // sort = 'sold' => sort = ['sold']
    model,
    page = 1,
    limit = 5,
  }) => {
    if (typeof page === 'string') {
      page = parseInt(page);
    }
    if (typeof limit === 'string') {
      limit = parseInt(limit);
    }
    page = page - 1; // page = 1 => page = 0

    let sortBy = {};
    if (sort) {
      sort = sort.trim(); // remove space example: 'sold ' => 'sold'
      sort = sort.split(','); // split string to array
      sort = sort.map((item) => item.trim()); // remove space in array

      if (sort[1]) {
        sortBy[sort[0]] = sort[1];
      } else {
        sortBy[sort[0]] = 'asc'; //default sort asc
      }
    }

    const result = await model
      .find({
        name: { $regex: keySearch, $options: 'i' },
      })
      .sort(sortBy)
      .skip(page * limit) // done
      .limit(limit); // done

    const total = await model.countDocuments({
      name: { $regex: keySearch, $options: 'i' },
    });

    return {
      total,
      page: page + 1,
      limit,
      data: result,
    };
  };

  search = async (req, res) => {
    try {
      const { page, limit, keySearch } = req.query;

      const productsResult = await this.searchAtModel({
        keySearch,
        sort: 'sold,desc',
        model: Product,
        page,
        limit,
      });

      const recipesResult = await this.searchAtModel({
        keySearch,
        model: Recipe,
        page,
        limit,
      });

      // combine 2 array
      const total = productsResult.total + recipesResult.total;
      const data = [...productsResult.data, ...recipesResult.data];

      const response = {
        status: 'success',
        message: 'Search successfully',
        total,
        page: productsResult.page,
        limit: productsResult.limit,
        data,
      };

      res.status(200).json(response);
    } catch (err) {
      res
        .status(404)
        .json({ status: 'error', message: err.message, error: err });
    }
  };
}

export default SiteController;
