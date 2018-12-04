# Boast

Boast was created to allow users to track their success in competitions with their friends, so that they can support their claims of being better than one another. Users can search for games using the Board Game Geek API. From there, they can add games to a database, with each user having their own unique games. Games can 'played,' creating a unique instance. Each instance has its own dataset, including players and scores. A user's data is constantly displayed on the screen in chart form. On the home menu, the user will see total wins, and moving on can see wins by category, or by specific game. The scores of the three previous plays, or instances, of any game are displayed on that game's view, in bar chart form.

Users can asign each game a category, which will add to existing categories, or create a new one if it doesn't already exist. The games can athen be filtered by category for searching or for win percentage generation. Users can also connect with other users as friends, utilizing a live search feature to filter through existing users.

Live app running at https://still-crag-62871.herokuapp.com/#/home

## Built With

React.js
React-Redux
Redux-Saga
Passport.js
Chartjs-2
Node.js
Express.js
PostgreSQL
Material-UI
Moment.js


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [postgresQL](https://www.postgresql.org/download/)
- [postico](https://eggerapps.at/postico/) to interface with postgreSQL



### Installing

1. Download this project.
2. `npm install`
3. `npm run server` in one terminal window
4. `npm run client` in another terminal window
5. Turn on PostgreSQL, instructions depend on install method
6. Copy/paste the database.sql file into postico, and execute the CREATE TABLE statements



## Screen Shot

![Home Page](public/images/home.jpg?raw=true)
![Game Page](public/images/game.jpg?raw=true)
![Dropdown Action Menu](public/images/menu.jpg?raw=true)

## Documentation

https://docs.google.com/document/d/e/2PACX-1vQLj7b3x5xB8FuGcqGpzmpS9C32s6E2w_PVaYX08Cr4nGrsIrboeV5crA2T6ae260sKj1YKg_vHcKOo/pub

### Completed Features

- [x] Search API for board games
- [x] Add a game to the database
- [x] Add users to a game instance, add scores
- [x] Data visable in a variety of forms and datasets
- [x] Connect with other users
- [x] Asign categories, can filter by category
- [x] Authentication and protected routes
- [x] Live search users, friends, or games

### Next Steps

- [ ] Messages and Wagers
- [ ] Add Custom competitions with image file upload
- [ ] Improve styling
- [ ] Filterable data
- [ ] More robust stat tracking, custom scoring

## Authors

* Jonathan Reckinger


## Acknowledgments

* Starter code by Prime Digital Academy