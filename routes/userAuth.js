const router = require("express").Router()
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/setavatar/:id", async(req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        user.defaultImg= req.body.img;
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        
    }
})

// register user
router.post("/register", async (req, res) =>{
    try{

        // generate hashed password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create new user in DB

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            name: req.body.name,
            password: hashedPassword,
            gender: req.body.gender,
        })

        //save user and return response...

        const user = await newUser.save();

        // const responseObj = {
        //     error:
        // }
        res.status(200).json(user);
    }
    catch (error){
        res.status(500).json(error);
    }
})


//login user

router.post("/login", async(req, res)=>{
    try {
        const user = await User.findOne({email: req.body.email});

        !user && res.status(404).json("User not found!!!");

        // validate password
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        !validPassword && res.status(404).json("Wrong password try again!!!!")


        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
})

// change password

// router.put("/forget-password/:id", async(req, res)=>{
//     try {
//         const user = await User.findOne({_id: req.body.userId});
//         const password = req.body.password;

//         // validate password
//         const validPassword = await bcrypt.compare(req.body.password, mentee.password);

//         !validPassword && res.status(404).json("Wrong password!!!!")


//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// })

module.exports = router;
