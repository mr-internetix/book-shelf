const router = require('express').Router();
const books = require('../Db_models/books');






router.get('/:values',async(req,res)=>{

    console.log(req.params.values)
    var str = req.params.values 
    var newStr = str.indexOf('&')
    var book_id = str.slice(0,newStr)
    var book_name = str.slice(parseInt(newStr)+1)
    // console.log(book_name)

    const response = await books.findOne({_id:book_id})
    
    const index = response.bookName.indexOf(book_name)
    // console.log(response.bookName[0])

    const obj = {"book_name":response.bookName[index],"author_name":response.authorName[index],
                  "language":response.language[index],"type":response.type[index],"purchase_year":response.purchaseYear[index],
                  "price":response.price[index],"description":response.description[index],"phone_no":response.phoneNo[index],
                  "path":response.path[index] 
                        }


    
    // console.log(obj)
    res.render('book_des.ejs',{obj})

    
})

















module.exports = router;