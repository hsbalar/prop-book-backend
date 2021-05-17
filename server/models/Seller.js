import mongoose, { Schema } from 'mongoose';

const Seller = new Schema({
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
  isActive: Boolean,
  createdAt: Date,
});

export default mongoose.model('Seller', Seller);
