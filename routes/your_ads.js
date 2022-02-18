const router = require('express').Router()
const book = require('../Db_models/books')




router.get('/:uid',async(req,res)=>{

    const books = await book.findOne({uid:req.params.uid})
     



   
    // console.log(books)



    await res.json({books})

})
















module.exports = router;