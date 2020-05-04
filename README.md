# Final Project - Movie API App

This app was created for the final project for COP 4655 - Mobile Apps Projects. It uses the free [OMDb API](http://www.omdbapi.com/). The basic functionality allows a user to search for movies and add/remove titles from a favorites list. 

## Getting Started

This app was created using [Apache Cordova](https://cordova.apache.org/), and open source program that wraps HTML, CSS, and JS for use as a hybrid mobile application.

### Running as an Application
To run this app, download Apache Cordova and create a new project. Then, replace the default www file with the file from this project. The app can be launched as a hybrid app on both Android and iOS. Check the cordova website for more exact information on displaying the app on any given device. 

### Running on the Web
Since this application was built using HTML, CSS, and JS, it can also be run using a web browser. Simply download the www file and click on index.html to see the application. Note that, since the app was developed for mobile devices, it may not look the best with normal browser dimensions. 

## App Features

### Login Functionality
This app allows users to create new accounts and login. Relevant functions can be found with the newAccount.js file. Note that local storage was used to mock data storage for a login and thus may not be as secure. 

### Search Functionality
This app allows users to search movies based on title. Search results can also be narrowed down by year and type. Users can also click on search results to get more information. The relevant functions can be found in searchMovie.js and movieInfo.js. 

### Favoriting Functionality
This app allows users to favorite certain movies indicated by a red heart icon. This can be done from the search results page and the movie information page. The user can also acces their favorites from the "favorites" tab, where they can click on the title for more information. The relevant functions can be found in favoriteMovie.js and movieInfo.js.

### User Profile
This app also allows the user to logout and delete their account from the user profile page. The relevant functions can be found in userProfile.js.
## Built With

* HTML, CSS, and JavaScript
* [Bootstrap](https://getbootstrap.com/)
* [Apache Cordova](https://cordova.apache.org/)

## Authors

* **Ciara O'Neill**

## Acknowledgments

* The heart icons were made with modification from Shapes4FREE, [Simple Hearts](http://www.shapes4free.com/photoshop-custom-shapes/simple-hearts-photoshop-custom-shapes/) set
* Dr. Jaramillo for giving the tools and information necessary to complete this app
* Introduction to Internet Programming, which gave me a solid foundation for this class
