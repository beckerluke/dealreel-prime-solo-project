# DealReel Prime Solo Project 

## Description
*Duration: 2 week sprint*

##### Patron Side
DealReel is a web application platform meant to help patrons surf a live feed of posted deals from nearby establishments based on their location (using geolocation)

##### Business Establishment Side
On the other end, the DealReel is also meant to be used by business establishments to post real-time deals to this live feed, viewable to all nearby patrons within a 30 mile radius of that establishment (using Google Distance Matrix API)

The application gives an establishment the ability to broadcast live deals fast to a more targeted market of patrons within their proximity.

##### Overall

The application is meant to enhance communication efficiency between business establishments and target patrons within their proximity when it comes to deal promotions. DealReel is a one-stop-shop platform for these patrons to surf all active deals in their area.

To see the fully functional site, please visit: [DealReel](https://sleepy-beyond-06909.herokuapp.com/#/home)

#### Prerequisites
- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)
- [Google Maps Platform API key](https://developers.google.com/maps/documentation/javascript/get-api-key)

## Installation
1. Create a database named ```deal_reel```,
1. The queries in the ```database.sql``` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/),so make sure to have that installed. It is recommended that you also use [Postico](https://eggerapps.at/postico/) to run those queries as that was used to create the queries,
1. Open your editor of choice and run an ```npm install```
1.  Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=random string
    ```
    *You should replace the **"random string"** with a long random string to keep application secure* 
1. You will also need to put
 your Google API key in the `.env` file. 
 It should look something like: 
    ```
    GOOGLE_API=YOUR API KEY
    ```
1. Run ```npm run server``` in your terminal
1. Run ```npm run client``` in your terminal
1. The ```npm run client``` command will open up a new browser tab for you!

## Usage

##### Patron User
1. Navigate to the DealReel site.
1. Upon arrival, you will be asked if it's okay to use your location to locate nearby live deals. Press ```Allow``` to let the application find live deals near you. 
1. After you allow the site to use your location, wait a couple seconds for the application to populate the page with a live feed of all the active deals within your vicinity. 
1. If there are active deals in your area, the page will load a list of those deals in the form of different "deal cards".
1. If there are no active deals happening near you, the page will have a header at the top stating "No Deals Happening Near You At This Time" 

##### Business User
1. Follow directions 1-5 of *"Patron User"* above.
1. Click  the ```GO TO YOUR DEALS``` button underneath the "Already a Member?" heading at the top of the page. You will be taken to a login page.
1. If you have already registered, login your user info here and click the ```Login``` button, which will navigate you to a *"Your Deals"* page. 
    *This page will show you a list of all of the deals your establishment has ever set and their details (including both the past and future)*.

    Jump to step 8 once logged in.

1. If you haven't already registered, click the ```Register``` button towards the bottom of the page
1. Fill out your business info in the places provided. Make sure that your establishment name and address (street, city, state) are valid!
1. Click the ```Register``` button towards the bottom.
1. Once registered, you should be taken to the *"Your Deals"* page. This page will let you know that you haven't set any deals yet.
1. Now that you are registered and logged in. The Navigation Bar will consist of: 
- *Deals Near You* (list of live deals feed that all users can see), 
- *Your Deals* (all deals you've set),
- *Add Deal* (where you can set and add a deal to the live *Deals Near You* feed), 
- *Log Out*, and 
- *About*
9. To add a deal to the the live feed for everyone in your area to see, click on the ```Add Deal``` tab on the Navigation Bar.  
10. In the inputs provided, 
- Enter a start datetime (*when your deal will start*) and an end datetime (*when your deal will end*) for your deal.  This is the time frame your deal will be broadcasted on the live feed for everyone to see.
- Enter a description of your deal (*this should be as brief as possible!*)
- Enter a redemptions limit if you have one.
- Click the ```Add Deal``` button under the input areas.

11. If you added a deal successfully, you will be alerted with a checkmark.
12. From here, you can click the "*Deals Near You*" tab in the Navigation Bar to view your deal in the live feed that your patrons can see.

## Built With
This application uses React, Redux, Express, Passport, and PostgreSQL, and the [Google Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/intro) (a full list of dependencies can be found in `package.json`).

## Acknowledgement
I want to thank Prime Digital Academy for guiding me through the process of taking an idea and implementing it into a functional application.
## Support
If you have any suggestions or issues, please email me at beckerluke1@gmail.com
