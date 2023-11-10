import express from "express";
import { getMyProfile, login, logout, register } from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", register);
router.post("/login", login);

router.get("/logout", logout);

//query -> anything in url after ? , eg -> http://localhost:4000/usersid?id=65434bf01b2a3f8469262f15.
//accessing query
// router.get("/usersid", async(req,res)=>{
//     const {id} = req.query;  
//     const user = await User.findById(id);
//     res.json({
//         success : "true",
//         user,
//     });
// });

// *********dynamic routing**************  make it at end, so that imporant params can be made above

// anything in place of :id is params
//  router.get("/:id", UserByid);

//  router.put("/:id", UpdateUserByid);

//  router.delete("/:id", DeleteUserByid);

// We can chain above three requests

router.get("/me", isAuthenticated, getMyProfile);

export default router;