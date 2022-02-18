const router = require('express').Router()
const user = require('../Db_models/users')



router.post('',async (req,res)=>{

    try{
        console.log(req.body.imageUrl)
        console.log(req.body.uid)
        const id = await user.findOne({uid: req.body.uid});
        if(id){
        res.send({
            "uid":id.uid
        });
        
        }
        else{
            const users = new user( {
                
                displayName: req.body.name,
                email: req.body.email,
                photoUrl: req.body.imageUrl,
                uid: req.body.uid,
                phone:req.body.phone,
            });

            console.log(users)


            const userId = await users.save();
            const id = await users.findOne({uid: req.body.userid});

            await res.send({
                "uid":id.uid
            });
    
            
            console.log("user account created")
        }

    }catch(err){
        return res.json({error:'something went wrong '});
    }


     
    res.send('account created')


})
























module.exports = router;