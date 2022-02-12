import Property from '../models/Property';

export const getDashboard = (req, res) => {
  Property.aggregate([
    {
      $facet: {
        buy: [{ $match: { listType: { $eq: 'Buy' } } }, { $count: 'buy' }],
        sell: [{ $match: { listType: { $eq: 'Sell' } } }, { $count: 'sell' }],
        rent: [{ $match: { listType: { $eq: 'Rent' } } }, { $count: 'rent' }],
      },
    },
    {
      $project: {
        buy: { $arrayElemAt: ['$buy.buy', 0] },
        sell: { $arrayElemAt: ['$sell.sell', 0] },
        rent: { $arrayElemAt: ['$rent.rent', 0] },
      },
    },
  ]).exec((err, metrix) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    return res.json({ ...metrix[0] });
  });
};

export const filterProperty = (req, res) => {
  const { listType, inputSearch } = req.body;
  Property.paginate(
    { listType, $text: { $search: inputSearch } },
    { page: 1, limit: 10 },
    (err, result) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      return res.json(result);
    }
  );
};

export const getProperty = (req, res) => {
  const { listType, rowsPerPage, page } = req.body.pageData;
  Property.find({ listType })
    .limit(rowsPerPage)
    .skip(rowsPerPage * page)
    .exec((err, list) => {
      Property.countDocuments({ listType }).exec((errTotal, total) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        return res.json({ list, total });
      });
    });
};

export const deleteProperty = (req, res) => {
  Property.deleteMany({ _id: { $in: req.body || [] } }).exec((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    return res.json(data);
  });
};

export const saveProperty = (req, res) => {
  const newBuyer = new Property({ ...req.body });
  newBuyer.save((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    return res.json(data);
  });
};

export const updateProperty = (req, res) => {
  Property.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { upsert: true, useFindAndModify: false },
    (err, data) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      return res.json(data);
    }
  );
};

export const advanceFilter = (req, res) => {
  const {
    isNewProperty,
    bedrooms,
    propertyType,
    postBy,
    city,
    projectName,
    personName,
    locality,
    price,
    pricePerUnit,
    builtUpArea,
    createdAt,
    availableFrom,
  } = req.body;

  const allFields = [
    isNewProperty,
    bedrooms,
    propertyType,
    postBy,
    city,
    projectName,
    personName,
    locality,
  ];
  let textSearch = '';
  allFields.forEach((field) => {
    if (field) textSearch += `${field} `;
  });
  textSearch = textSearch.trimEnd();

  let searchQuery = {};
  if (textSearch) {
    const textQuery = { $text: { $search: textSearch } };
    searchQuery = { ...searchQuery, ...textQuery };
  }

  if (price[0] && price[1]) {
    const priceQuery = {
      price: { $gte: parseInt(price[0]), $lte: parseInt(price[1]) },
    };
    searchQuery = { ...searchQuery, ...priceQuery };
  }

  if (pricePerUnit[0] && pricePerUnit[1]) {
    const pricePerUnitQuery = {
      pricePerUnit: {
        $gte: parseInt(pricePerUnit[0]),
        $lte: parseInt(pricePerUnit[1]),
      },
    };
    searchQuery = { ...searchQuery, ...pricePerUnitQuery };
  }

  if (builtUpArea[0] && builtUpArea[1]) {
    const builtUpAreaQuery = {
      builtUpArea: {
        $gte: parseInt(builtUpArea[0]),
        $lte: parseInt(builtUpArea[1]),
      },
    };
    searchQuery = { ...searchQuery, ...builtUpAreaQuery };
  }

  if (createdAt[0] && createdAt[1]) {
    const createdAtQuery = {
      createdAt: {
        $gte: createdAt[0],
        $lte: createdAt[1],
      },
    };
    searchQuery = { ...searchQuery, ...createdAtQuery };
  }

  if (availableFrom[0] && availableFrom[1]) {
    const availableFromQuery = {
      availableFrom: {
        $gte: availableFrom[0],
        $lte: availableFrom[1],
      },
    };
    searchQuery = { ...searchQuery, ...availableFromQuery };
  }

  Property.paginate(searchQuery, { page: 1, limit: 25 }, (err, result) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    return res.json(result);
  });
};
