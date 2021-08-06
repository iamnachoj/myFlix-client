# myFlix-client
 Client-side block for MyFlixApp, a Single Page Appication (SPA) for cinephiles, where they can scroll through many different movies and see information about them, like their descriptions, genres, directors etc. Built out of several React components, the app runs fast, asynchronous and very fluid. 
 
All the data in the app is fetched from my own MOVIE API. (link to it <a href="https://github.com/iamnachoj/Movie-API">here</a>)

# Tools
React.js 
 - React-Bootstrap
 - React-redux
 - Parcel
 - Babel
 - 
# How it works?

The site needs first and foremost to authenticate and authorise the user. If you are not an user, you need to register. Once you are registered, you will have full access to the MainView, where you will see displayed all the movies fetched from the MOVIE API project 
 
From there, you can scroll through movies, click on 'open' and see more information about them, as a brief description, the director, and the genre (which are also links that when clicked offer more info about them)
 
You can also add movies to your favourite list and check out your profile, where it is possible to see all the favourited movies and remove them if you will (sometimes you get fed up with a particular movie, it happens to the best of us!)
 
It is also possible to delete the account and to update the user name or password.

# Features 
 - fully responsive built with React bootstrap
 - Easy scalability thanks to common UI patterns like the use of Redux to manage the state
 - interaction to Mongo database.
 - UI patterns that follow best trends.

# Deployment (how to get the project running?)
 
 - Fork it on your github account, and clone it locally.
 - From your Command Line Interface, 'cd' into the folder and run the first package.json script: ```'npm start' ```. It will launch parcel and bundle up the code.
 - Once budled up, it will serve the file on port 1234. Run it from the browser, and the site will be there 
 
### See demo here: <a href="https://myflixyapp.netlify.app/">MyFlix App</a>
