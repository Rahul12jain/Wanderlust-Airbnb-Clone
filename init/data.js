const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      url: "https://img.freepik.com/premium-photo/cozy-beachfront-cottage-sunset-tropical-paradise-with-ocean-views-palm-trees-relaxing_996993-88021.jpg",
      filename: "listingImage"
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      url: "https://www.millenniumhotels.com/mhb-media/regions/europe/uk/london/thebaileyshotellondonkensington/generic/images/baileys-hotel.jpg?rev=b3eae89c9eea479fb2536c480224effc",
      filename: "listingImage"
    },
    price: 1200,
    location: "New York City",
    country: "United States",
  },
  {
    title: "Mountain Retreat",
    description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/557377969.jpg?k=a969182100af943d89fb0e9956269227016f974fbf015abb7af4ddc785b5f2e5&o=&hp=1",
      filename: "listingImage"
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Historic Villa in Tuscany",
    description: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgI3TW05bkYjNm07AwARBUiIVJ3G-dcq1N6A&s",
      filename: "listingImage"
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
  },
  {
    title: "Secluded Treehouse Getaway",
    description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmTd5Qf5IaoklkpH4OgGa2Vv8HdWfrMq-9EA&s",
      filename: "listingImage"
    },
    price: 800,
    location: "Portland",
    country: "United States",
  },
  {
    title: "Beachfront Paradise",
    description: "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: {
      url: "https://www.ohotelsindia.com/goa/images/bccadd6018a0421487734769d7014e73.jpg",
      filename: "listingImage"
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
  },
  {
    title: "Rustic Cabin by the Lake",
    description: "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: {
      url: "https://www.ohotelsindia.com/goa/images/bccadd6018a0421487734769d7014e73.jpg",
      filename: "listingImage"
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
  },
  {
    title: "Luxury Penthouse with City Views",
    description: "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW2lEpC5y_aFjqlHxdrTjFjas-jbtAz5aSGA&s",
      filename: "listingImage"
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description: "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW6knNcqHxVVXoUcKuSMyzBms84LW1rN7Zpw&s",
      filename: "listingImage"
    },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
  },
  {
    title: "Safari Lodge in the Serengeti",
    description: "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdjz_38iiYFq7HPr-WBvNahXxMWmUwSr6fVg&s",
      filename: "listingImage"
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
  },
  {
    title: "Historic Canal House",
    description: "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeTEa9jUxC7hK2KWqVuJjcIixMLGikVDB0UQ&s",
      filename: "listingImage"
    },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
  },
  {
    title: "Private Island Retreat",
    description: "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9etK5WvkdnUt5Ou-DYQEXwOURWjsHb28TYw&s",
      filename: "listingImage"
    },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
  },
  {
    title: "Charming Cottage in the Cotswolds",
    description: "Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnMK8wNPW0zlGe4p2O0CIWk_eP_HuhL6r_Vg&s",
      filename: "listingImage"
    },
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
  },
  {
    title: "Historic Brownstone in Boston",
    description: "Step back in time in this elegant historic brownstone located in the heart of Boston.",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR0EC8kJARpfO1TW6ndLBgN2XZQLVbzMY2-A&s",
      filename: "listingImage"
    },
    price: 2200,
    location: "Boston",
    country: "United States",
  },
  {
    title: "Beachfront Bungalow in Bali",
    description: "Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcp237CwnaTE8ISHQVdbWLuA4qWVfLpAbuCA&s",
      filename: "listingImage"
    },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
  },
];

module.exports = { data: sampleListings };
