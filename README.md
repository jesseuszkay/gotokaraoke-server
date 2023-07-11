# gotokaraoke

gotokaraoke is a comprehensive karaoke song database that allows users to search, filter, and create personalized song lists. The database includes songs sourced from the Sing King Karaoke channel, ensuring that there is at least one karaoke version available for each song. Additional data, obtained from Spotify and carefully edited for accuracy, has been integrated into the database to enhance filtering capabilities.

Users can utilize various filters such as genre, song length, and decade released to find songs that meet their specific needs and preferences. This empowers them to discover new songs or locate their favorite classics with ease.

Designed with mobility in mind, the app offers a user-friendly mobile version, allowing users to access and interact with the karaoke song database while on the go, perfect for impromptu karaoke sessions. Additionally, a desktop version is available for users to compile comprehensive song lists when they have more time.

Each song in the list provides a direct link to the corresponding karaoke version on YouTube, enabling users to practice or utilize the songs during karaoke sessions at venues where YouTube is accessible. This seamless integration with YouTube enhances the user experience and provides a convenient platform for practicing and enjoying karaoke songs.

## Authors

- [@jesseuszkay](https://www.github.com/jesseuszkay)

## Installation

To install gotokaraoke locally on your device:

- Git clone both the gotokaraoke repository and the gotokaraoke-server repository.
- Install the dependencies in both folders.
- Create a database in mysql to store the songs, users, and song_matches data.
- Create a .env in the server folder file based off of the example file contained in the repository. Ensure that
- Run npx knex migrate:latest and npx knex seed:run to create the necessary tables and seed the song data into the songs table.
- Run the server with "npm start" and run the client-side with "npm run dev".

## Roadmap

- Tooltip tutorial
- Song added notification
- Request-a-song and report incorrect data functionality
- Adding more songs

## Tech Stack

**Client:**

- HTML
- CSS
- JavaScript
- React
- Sass
- Axios: To make HTTP requests to the server.
- Material UI: for modals

**Server:**

- Node.js: To run JavaScript on the server-side.
- Express: Web application framework for Node.js.
- Bcrypt: To hash and salt passwords
- CORS: To handle Cross-Origin Resource Sharing to enable communication between different domains.
- dotenv: To load environment variables from the .env file into Node.js.
- JSON Web Token (JWT): To securely transmit user information as a JSON object.

**Database**:

- Knex: SQL query builder for Node.js
- MySQL: Relational database management system

## How to use gotokaraoke

Enter the gotokaraoke site by clicking "Enter here" on the landing page.

If you are short on time, you can immediately start looking through and/or filtering the song list and album grid to quickly find your perfect song. However, to truly experience gotokaraoke, you should create your own account. To do this, click "Login" in the upper right corner and then "Don't have an account, click here to create one!".

Enter a username and password. If your username is not taken, you will be directed to the login page where you should enter your new username and password.

From there, you will be taken to your profile page, which will suggest that you should take a look at the song finder to add some songs to your profile.

On the Song Finder page (also the home page), you may search through the entire list of songs using the ">" and "<" buttons, or you may filter the song list with a text search or using the dropdown filters for decade released (if you want nostalgia or brand new hits), song length (to savor your time in the spotlight or to leave them wanting more), and genre (to find the perfect song to express yourself). Once you've entered your filters, click the "Filter Songs" button to see the corresponding songs. If you want to remove all filters and start over, click the "Reset Filters" button and then "Filter Songs" to see the complete list again.

Clicking the title of a song on the list will open a link to a karaoke version on Sing King Karaoke on YouTube in another window so you can check to make sure it suits your needs, or practice it if you have the time. To add the song to your list, click the "+" icon on the right. When you click the "+" icon, it will change to a "-" icon to remove the song from your list (in case you clicked it by accident). You can now check your profile page by selecting "Profile" in the nav bar and you should see the list of songs you selected. To remove a song from your list, perhaps once your friends are getting sick of hearing it, you can click the "-" icon next to the song.

Your song list is saved in the gotokaraoke database, so even if you need to close your browser or log out your songs will always be there for you when you log back in. Check back in frequently as we will be adding new songs and features regularly!

## Why and how gotokaraoke was made (TLDR version)

This project was inspired by my passion for karaoke nights and the struggle of quickly deciding what to sing. To address this, I created an app that curates karaoke songs matching specific criteria. I built the database using data from the SingKing Karaoke Channel on YouTube and supplemented with information from the Million Song Dataset on Kaggle.

I developed the server with endpoints for serving song and list data, as well as implementing user authentication. On the client side, I focused on creating a user-friendly and aesthetically pleasing design, particularly for mobile use in dark karaoke bars.

One of the major challenges I faced was resolving issues with pending HTTP requests. While implementing various features, including a "Song of the Day" functionality, I encountered difficulties with requests getting stuck. I intend to fix this issue in the future but prioritized completing the remaining site features first.

Through this project, I learned the importance of meticulous backend implementation and considering the order of events in each endpoint. Planning and mapping out complex features beforehand would have been beneficial.

Overall, I thoroughly enjoyed building this app and look forward to seeing people try it out and improving it over time.

## Why and how gotokaraoke was made

The idea for this project came from my passion for karaoke nights combined with the absolute dread I feel when forced to quickly decide what to sing. In that moment, the only song I can ever remember is "...Baby one more time" by Britney Spears, which is certainly a classic but definitely not the only song in the world (and often someone else will select it before me - song repeating is just plain wrong). Trying to find anything I can sing in my Spotify app usually comes up empty, as I have a tendancy to listen to songs completely out of my ability range (and a ton of podcasts). Thus the idea was formed, I could make my own app to curate songs that are a) likely to have a karaoke version, b) suit my needs for song choices (I personally like short, upbeat, and popular songs) and c) fit the vibe of the karaoke session (80s-themed night? Need a breakup ballad?). I wanted to create my own song database that could be filtered on these criteria and then be able to save those songs to a list specifically for karaoke purposes.

I started by creating the database, which was one of the most difficult parts of this project, even with my background in data science. My primary source for song data is the SingKing Karaoke Channel on YouTube, and I used the YouTube API to collect information from hundreds of videos. Luckily, SingKing titles their videos in a consistent format: "Artist(s) - Song Title", so it was easy to extract those pieces of data. But besides the song title, the artist, and the video itself, there isn't really any of the other data I need for filtering (year released, genre, etc.) I looked into using Spotify's API to get the additional info, but realizing that I would need to make hundreds of calls to the API to simply store that data, I wondered if anyone else had already done that work and posted it publicly. Sure enough, on Kaggle (an open source data website) someone had done exactly that (https://www.kaggle.com/datasets/undefinenull/million-song-dataset-spotify-lastfm). I downloaded this dataset and did a join on exact matches of song title and artists, which gave me 315 songs. Looking through that list, it seemed to be enough to get going on the rest of the project as most of the popular karaoke songs are on there. However, I also noticed that a lot of the "year released"s were completely off - most likely it was the year of the most recent remastering - but this would make filtering by decade a problem. With a little help from Chat GPT, I manually edited the year of most of the 315 songs, which was extremely tedious but I believe important to the usefulness of the app. Long term, I want the quality (and quantity) of the data to be a primary focus. I also created two additional tables: a users table and a song_matches table (for storing matches between users and songs when a user saves a song to their list).

Then I started on the server, creating endpoints for serving song and list data as well as creating the authentication process so users could create an account and access their data. The authentication process was more time consuming than I expected, but I believe I now have a much more thorough understanding of it.

Finally I got to work on the client side, where I had already been messing around with some designs before the project officially started (in particular, my "neon sign" logo which I believe reflects the karaoke aesthetic). Designing a user-friendly and aesthetically pleasing desktop and mobile design was certainly one of my biggest challenges, and one I think I will continue improving upon. I knew I wanted a mobile-friendly design and dark theme as the primary location to use the app will be at a dark karaoke bar (where you don't want a bright white light eminating from your phone), however I did not find many examples of sites with this design that I found appealing. I am pleased with the result but I do think there is more work to be done.

My largest challenge by far was when I was having issues with HTTP requests being held as "pending" in the network. When I started working on the site I added a ton of features, one of which I spent many hours on but is not included in the current sprint is the "Song of the Day" functionality. I would obtain a video from the YouTube API directly on the front end and then I had a voting mechanism where users could rate whether they found the song to be fun and/or easy (with the intention being that I could review these songs to see if they should be added to the database). The client-side would send the video data to the backend which would add the song to the "daily_song" table (if it was not already on there) and if a user logged in it would send the user_id and video_id combination to be added to the daily_votes table. If the user voted that a video was fun and/or easy, that would be sent to the daily_votes table which would trigger an update in the daily_song table to add to the cumulative votes for that song. I got all of it to work - except that if you navigated to the "Profile" page and then pack to the "Home" page it would go to the "Loading" state until you refreshed the page. I thought this could be a simple fix until I realized that little mistakes I had made here or there were causing there to be "pending" requests, and since I had so many endpoints and connections I realized it would take me many more hours to ensure I had done everything exactly correctly. I do intend to fix this feature soon, however I realized I had to cut my losses and make sure the rest of the site was complete before diving into that. I learned in the process that just because something is working fine most of the time does not mean that you did it correctly, and little shortcuts can lead to big cumulative issues that are difficult to disentangle. For backend work I have learned that it is very important to consider exactly what is going on in each endpoint, the order of events, and what would happen if something goes wrong. I think for such a complicated feature, I should have drawn out a map before beginning to implement everything.

Every part of the process that was frustrating taught me so much and I know that those parts of my next project will go much more smoothly (though there will certainly be frustrations in every project). Managing my time and energy effectively as well as knowing when to cut my losses proved to be the key to creating a product that I am satisfied with. Overall, I thoroughly enjoyed building this app and look forward to seeing people try it out and improving it over time.
