import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Property = new Schema({
  personName: String,
  personPhone: String,
  listType: String,
  categoryType: String,
  propertyType: String,
  postBy: String,
  isNewProperty: String,
  isNegotiable: Boolean,
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

Property.plugin(mongoosePaginate);
Property.index({
  personName: 'text',
  personPhone: 'text',
  city: 'text',
  projectName: 'text',
  locality: 'text',
  address: 'text',
  about: 'text',
});

const PropertyModel = mongoose.model('Property', Property);
PropertyModel.createIndexes();
export default PropertyModel;
