import mongoose, { Schema} from 'mongoose';

 export interface Product {
    name: string;
    description: string;
    img: string;
    price: number;
  }

const ProductSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    
    description: {
      type: String,
      require: true,
      unique: true,
    },

    img: {
      type: String,
      require: true,
      unique: true,
    },

    price: {
      type: Number,
      require: true,
      unique:false,
    }
  },
  {
       versionKey: false,
    }
)
export default mongoose.models.Product as mongoose.Model<Product> || mongoose.model<Product>('Product', ProductSchema);