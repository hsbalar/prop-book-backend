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
