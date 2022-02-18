const router = require('express').Router();
const users = require('../Db_models/users');
const admin = require("firebase-admin");



router.get('/:uid',async(req,res)=>{
    const sessionCookie = req.cookies.session || "";
    admin
    .auth()
    .verifySessionCookie(sessionCookie,true)
    .then(async()=>{

          
    try{
        const id = await users.findOne({uid:req.params.uid});
    

        return res.render('sell',{
            name: id.displayName,
            photoUrl: id.photoUrl,
            email: id.email,
            phone: id.phone,
           csrfToken: req.csrfToken()
        });
        // console.log(id)
        // console.log(req.params.uid);


    }catch(err){
        console.log('something went wrong')
    }

       
    })
    .catch((error)=>{
        res.redirect("/login")
    });


    
    
    
  
})


module.exports = router;