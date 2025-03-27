import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String
    },
    brand: {
        type: String
    },
    gender: {
        type: String
    },
    sizes: {
        type: Array
    },
    price: {
        type: Number,
        min: 0
    },
    colorway: {
        type: String
    },
    style:{
        type: String
    },
    info: {
        type: String
    },
    images: {
        type: Array,
        min: 4
    },
    likes: {
        type: Array
    },
    reviews: {
        type: Array
    }
});

const Product = model('Product', productSchema);

export default Product;