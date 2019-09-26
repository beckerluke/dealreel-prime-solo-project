let GoogleLocations = require('google-locations');
let locations = new GoogleLocations(process.env.GOOGLE_API);

locations.search({
    radius: 500000, 
    type: 'restaurants', 
    location: [39.0985854, -94.5783239]
}), (err,response) => {
    console.log("search: ", response.results)
}