const router = require("express").Router();
const books = require('../Db_models/books');




router.get('/',async(req,res)=>{
    data = await books.find({});
    res.render('buy.ejs',{info:data})
    // console.log(data)

})




module.exports = router;