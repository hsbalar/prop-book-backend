import Property from '../models/Property';

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
