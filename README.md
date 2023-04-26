# 📰 NC News (in progress...)

An articles web app built with React.
<br><br>
**live version** - https://nc-top-news.netlify.app/

## Current State of App

The app is still in development. As of now users can register, login, view articles, comment on articles and upvote/downvote articles. If a user leaves the page, the session is stored in a cookie.

The following features still need implementing:
- Dashboard page
- Posting an article
- Articles pagination
- Upvote/downvote of comments

(Please refer to the wireframe in this repo for an overview of these features)

Also, there are some improvements to be made in regards to design and responsiveness.

## Installation and Setup Instructions

Clone down this repository. You will need `node 18.15.0 LTS +` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Start Server:

`npm start`  


## Reflection

This was a week long project completed as part of the bootcamp at Northcoders.

One of the main challenges I ran into was Authentication/Authorization. 

This was not part of the project requirements, and the backend api was not developed originally to support this feature. But this was something I really wanted to learn about. So on my free time I worked on refactoring the api, and this lead me to spend a few days researching authentication, authorization with JWT, cookies and Cross-Origin Resource Sharing.

This turned out to be a highly interesting topic, and I chose to allocate more time than originally planned into the development of the login/register features, hence the intial unrefined state of the app's design.

## Notes on CORS

At the moment, CORS is enabled in backend with a list of two allowed origins: 
- https://nc-top-news.netlify.app
- http://localhost:3000

Therefore, if you run this app in localhost and get CORS errors, please check that your local server is using port 3000.
