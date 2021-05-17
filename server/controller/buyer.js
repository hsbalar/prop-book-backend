import Buyer from '../models/buyer';

export const getBuyers = (req, res) => {
  Buyer.find().exec((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    return res.json(data);
  });
};

export const addBuyer = (req, res) => {
  const newBuyer = new Buyer({ ...req.body });
  newBuyer.save((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    return res.json(data);
  });
};
