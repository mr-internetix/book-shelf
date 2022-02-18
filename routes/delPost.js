const router = require('express').Router();
const { response } = require('express');
const books = require('../Db_models/books');





router.post('',async(req,res)=>{


   var response = await books.find({uid:req.body.uid})
    const id  = req.body.id
    const uid = req.body.uid
     var  data = response
    const bookname = data[0].bookName[id] 
    const authorname =data[0].authorName[id]
    const language_in = data[0].language[id]
    const type = data[0].type[id]
    const purchaseyear = data[0].purchaseYear[id]
    const price = data[0].price[id]
    const description = data[0].description[id]
    const phoneno = data[0].phoneNo[id]
    const path = data[0].path[id]

    const query = await books.updateOne({uid:uid},{$pull:{price:price,bookName:bookname,authorName:authorname,language:language_in,type:type,purchaseYear:purchaseyear,price:price,description:description,phoneNo:phoneno,path:path}},{multi:true})


    res.json({'message':'hello'})

})





module.exports = router;