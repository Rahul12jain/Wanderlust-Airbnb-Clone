// const express= require("express");
// const router = express.Router({ mergeParams: true });
// const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const {reviewSchema} = require("../schema.js");
// const Review = require("../models/review.js");
// const Listing = require("../models/listing.js");
// const {validateReview,isloggedIn, isReviewAuthor} = require("../middleware.js");

// const reviewController = require("../controllers/reviews.js");

 

// //Post Review Route
// router.post("/",
//     isloggedIn,
//     validateReview,
//     wrapAsync(reviewController.createReview));

// //Delete Review Route
// router.delete("/:reviewId",
//     isloggedIn,
//     isReviewAuthor,
//     wrapAsync(reviewController.destroyReview)
// );

// module.exports = router;

const express = require("express");
const router = express.Router({ mergeParams: true }); // ✅ mergeParams so :id from parent routes is accessible
const wrapAsync = require("../utils/wrapAsync.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {
  validateReview,
  isloggedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

// POST Review Route
router.post(
  "/",
  isloggedIn, // ✅ user must be logged in
  validateReview, // ✅ validate review using Joi schema
  wrapAsync(reviewController.createReview)
);

// DELETE Review Route
router.delete(
  "/:reviewId",
  isloggedIn, // ✅ user must be logged in
  isReviewAuthor, // ✅ only review author can delete
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
