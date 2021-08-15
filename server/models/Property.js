import mongoose, { Schema } from 'mongoose';

const Property = new Schema({
  personName: String,
  personPhone: String,
  listType: String,
  categoryType: String,
  propertyType: String,
  postBy: String,
  isNewProperty: String,
  city: String,
  projectName: String,
  locality: String,
  address: String,
  bedrooms: String,
  noOfFloors: String,
  propertyFloorNo: String,
  price: Number,
  pricePerUnit: Number,
  builtUpArea: Number,
  carpetArea: Number,
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

export default mongoose.model('Property', Property);
