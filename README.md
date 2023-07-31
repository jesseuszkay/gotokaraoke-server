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