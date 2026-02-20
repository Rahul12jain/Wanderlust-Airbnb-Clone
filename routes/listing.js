const express= require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isloggedIn, isOwner,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });;

// here we use router.route concept of express to combine same route path 
router.route("/")
.get(listingController.index)
.post(
    isloggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing)
);

 

 //New Route
 router.get("/new",isloggedIn,(listingController.renderNewForm));

router
  .route("/:id")
  .get(listingController.showListing)
  .put(
    isloggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    (listingController.updateListing)
   )
  .delete(isloggedIn,isOwner,wrapAsync(listingController.destroyListing));

//Edit Route
router.get("/:id/edit",isloggedIn,isOwner,(listingController.renderEditForm)); 


//Index Route
//  router.get("/",(listingController.index));

 

//Show Route
// router.get("/:id",(listingController.showListing));   

//Create Route  
// router.post("/",isloggedIn,validateListing,wrapAsync(listingController.createListing));

 

//Update Route
// router.put("/:id",isloggedIn,isOwner,(listingController.updateListing));

//Delete Route
// router.delete("/:id",isloggedIn,isOwner,wrapAsync(listingController.destroyListing));

router.all("*",(req,res,next) => {
    next(new ExpressError(404,"Page not found"));
});

module.exports = router;
