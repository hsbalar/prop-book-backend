import mongoose, { Schema } from 'mongoose';

const Buyer = new Schema({
  personName: String,
  personPhone: String,
  saleType: String,
  listType: String,
  categoryType: String,
  propertyType: String,
  city: String,
  projectName: String,
  locality: String,
  address: String,
  bedrooms: Number,
  noOfFloors: Number,
  propertyFloorNo: Number,
  price: Number,
  pricePerUnit: Number,
  area: Number,
  areaUnit: String,
  about: String,
  availableFrom: Date,
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Buyer', Buyer);
