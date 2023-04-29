#Firestore-Express Server

This is an Express server that uses Firestore for database operations. It provides RESTful endpoints for performing CRUD operations on data stored in a Firestore database. It is meant for a mobile app called Stackage, a community-driven app connecting tech enthusiants allowing them to share ideas/resources/best practices.


##Prerequisites##

Before you can use this server, you must have the following installed on your system:

    Node.js
    npm
    Firebase CLI

You must also have a Firebase project set up with a Cloud Firestore instance.


##Installation##

To install the server, clone the repository from GitHub:

    git clone https://github.com/your_username/your_repository.git

Then, install the dependencies using npm:

    npm install


##Configuration##

To configure the server, you need to set up your Firebase project credentials in a .env file. You can use the .env.example file in the project as a template:

PORT=your_port  
apiKey=your_firebase_api_key  
authDomain=your_firebase_auth_domain  
projectId=your_firebase_project_id  
storageBucket=your_firebase_storage_bucket  
messagingSenderId=your_firebase_messaging_sender_id  
appId=your_firebase_app_id  
measurementId=your_firebase_measurement_id  

You can find your Firebase project credentials in the Firebase console under Project settings > Service accounts.


##Usage##

To start the server, run the following command:

    npm run server

This will start the server on the port you specified.

The following endpoints are available:

    GET /users/:uid: returns all user data for a specific user
    GET /users/messages/:uid: returns the name and photo, meant for the messages component
    GET /posts: returns recent posts with optional query params category and uid
    POST /users/:uid: adds a new user to the db. uid usually given by google auth services.
    POST /users/messages/:uid/:uid2: adds a message between 2 users to the db. only increments the notification of uid2
    POST /posts: adds a new post to the db. default values are given for all neccessary info.
    POST /posts/comments/postid: adds a new comment to a specific post.
    PATCH /users/:uid: allows editing the user info for a specific user, such as: name, email, location, occupation, photoURL
    PATCH /posts/like/:postid: increments the like counter for a specific post
    PATCH /posts/dislike/:postid: increments the dislike counter for a specific post
    DELETE /posts/:postid: allows users to delete their own post 
