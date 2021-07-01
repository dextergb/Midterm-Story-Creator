# Story Creator Project by Dexter GB, Sam Roy-Effer, and Andrew Ievdokymenko

Story Creator - A multi-page collaborative story creator app.

## Skills on Display

Front-end:

- HTML
- CSS
- JS
- jQuery
- AJAX

Back-end:

- Node
- Express
- MongoDB

## Features

- Authorized users can start a story
- Users can add contributions to an existing story
- Users can upvote a contribution
- Creator of a story can accept a contribution; this merges it to the rest of the story
- Creator of a story can mark the story completed
- Users can view a list of stories on the homepage along with their status e.g. in progress or completed
- Users cannot add to a completed story
- Users can read a story

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information

- username: `labber`
- password: `labber`
- database: `midterm`

3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`

- Check the db folder to see what gets created and seeded in the SDB

7. Run the server: `npm run local`

- Note: nodemon is used, so you should not have to restart your server

8. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
