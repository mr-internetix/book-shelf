const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const booksSchema = new Schema({
    uid:{type:String,required:true},
    bookName:{type:Array,required:true},
    authorName:{type:Array,required:true},
    language:{type:Array,required:true},
    type:{type:Array,required:true},
    purchaseYear:{type:Array,required:true},
    price:{type:Array,required:true},
    description:{type:Array,required:true},
    phoneNo:{type:Array,required:true},
    path:{type:Array,required:true},
});



module.exports = mongoose.model('books',booksSchema);