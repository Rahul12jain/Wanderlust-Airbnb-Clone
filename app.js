if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

//console.log(process.env.SECRET) ;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
//const Listing = require("./models/listing.js");
const path = require("path");
const methoOverride = require("method-override");
const ejsMate = require("ejs-mate");
//const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
//const {listingSchema,reviewSchema} = require("./schema.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust'

const dbUrl = process.env.ATLASDB_URL;

//connection setup of mongooes with mongoDB
main()
  .then(() => {
    console.log("connected to DB ");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); //for parssing
app.use(methoOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR IN MONGO SESSION STORE", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// app.get("/",(req,res) => {
//     // console.dir(req.cookies());
//     res.send("hi, i am root");
// });

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// app.get("/demo", async (req,res) => {
//     let fakeUser = new User({
//         email:"student@gmail.com",
//         username:"belta-studenet",
//     });

//     let registeredUser = await User.register(fakeUser,"helloworld");
//     res.send(registeredUser);
// });

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// app.get("/testListing", async (req,res) => {
//       let sampleListing = new Listing ({
//         title:"My new villa",
//         description:"By the beach",
//         price:1200,
//         location:"Calangute Goa",
//         country:"India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved")
//     res.send("successful testing");
// });

app.use(cookieParser("secretcode"));

//signed cookie
app.get("/getsignedcookie", (req, res) => {
  res.cookie("made-in", "India", { signed: true });
  res.send("signed cookie sent");
});

//verify cookie
app.get("/verify", (req, res) => {
  console.log(req.signedCookies);
  res.send("verified");
});

//Cookies
app.get("/getcookies", (req, res) => {
  res.cookie("greet", "hello");
  res.cookie("madein", "india");
  res.send("sent you some cookies!");
});

app.get("/greet", (req, res) => {
  let { name = "anonymous" } = req.cookies;
  res.send(`Hi,${name}`);
});

// const validateListing = (req,res,next) => {
//     let{error} = listingSchema.validate(req.body);
//     if(error){
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     }else{
//       next();
//     }
// };

// const validateReview = (req,res,next) => {
//     let{error} = reviewSchema.validate(req.body);
//     if(error){
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     }else{
//       next();
//     }
// };

//Index Route
// app.get("/listings", async (req,res) => {
//    const allListings =await Listing.find({}) ;
//    res.render('listings/index',{allListings});
//    });

//New Route
// app.get("/listings/new",(req,res) => {
//     res.render('listings/new.ejs');
// })

//Show Route
// app.get("/listings/:id",  async (req,res) => {
//     let {id} = req.params;
//     const listing = await Listing.findById(id).populate("reviews");
//     res.render('listings/show',{listing})
// });

//Create Route

//.............................. here we use try and catch for async error handling....................................

// app.post("/listings", async(req,res,next) =>{
//     //let {title,description,image, price, country, locarion} = req.body;
//     // let listing = req.body.listing;
// try{
//     const newListing = new Listing(req.body.listing);
//     await newListing.save();
//     res.redirect("/listings");

//     // console.log(listing);

//    }catch(err){
//     next(err);
//    }
//   });

//Create Route

// .....................................here we use wrapAsync error handling...............................................

// app.post("/listings",validateListing, wrapAsync(async(req,res,next) =>{

//   const newListing = new Listing(req.body.listing);
//   await newListing.save();
//   res.redirect("/listings");

//      console.log(listing);

// }));

//Edit Route
// app.get("/listings/:id/edit",  async (req,res,next) => {
//     let {id} = req.params;
//     const listing = await Listing.findById(id);
//     res.render("listings/edit.ejs",{listing});
// });

// app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     //console.log(`Editing listing with ID: ${id}`); // Debug log

//     const listing = await Listing.findById(id);
//     if (!listing) {
//         return res.status(404).send("Listing not found");
//     }

//     res.render("listings/edit.ejs", { listing });
// }));

//Update Route
// app.put("/listings/:id", async (req,res) => {
//     let {id} = req.params;
//     await Listing.findByIdAndUpdate(id,{...req.body.listing});
//     res.redirect("/listings");
// });

//Review
//Post Route

// app.post("/listings/:id/reviews",validateReview,async (req,res) => {
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review);

//     listing.reviews.push(newReview);

//     await newReview.save();
//     await listing.save();

// res.redirect("/listings");

//      res.redirect(`/listings/${listing._id}`);

// });

//Delete Review Route

// app.delete("/listings/:id/reviews/:reviewId",
//     wrapAsync(async(req,res) => {
//         let{id,reviewId} = req.params;

//         await Listing.findByIdAndUpdate(id,{$pull:{reviews: reviewId}});
//         await Review.findByIdAndDelete(reviewId);

//         res.redirect(`/listings/${id}`);

//     })
// );

//Delete Route

// app.delete("/listings/:id", wrapAsync(async (req,res) => {
//     let {id} = req.params;
//     let deletedListing = await Listing.findByIdAndDelete(id);
//     console.log(deletedListing);
//     res.redirect("/listings");
// }));

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

//error handling middleware

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  //    res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs", { message });
});

// app.use((err,req,res,next) => {
//     res.send("something went wrong");
// });

app.listen(8080, () => {
  console.log("server is listen to 8080");
});
