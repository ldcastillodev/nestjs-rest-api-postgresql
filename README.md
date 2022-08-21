
# nestjs-rest-api-postgresql

API that allows you to create a feed of articles, get a paginated(limit is by default 5, page) feed of articles filtering by title, author, tag or storyTitle,
get an article by id, delete all articles at once or delete one by id,

## Installation

To initialize the app and postgres db with docker run:

### `docker-compose up --build`.

To initialize the app without docker you need a postgres db,
configure the required enviroment variables and run:

### `npm run start:dev`

## Requests

To populate the database with a feed of articles run (in postman):

### `POST request to: http://localhost:3000/feed`

To get all articles(returns 5 by default) run (in postman):

### `GET request to: http://localhost:3000/feed`

To get all articles filtered by title run (in postman):

### `GET request to: http://localhost:3000/feed?title=`

To get all articles filtered by author run (in postman):

### `GET request to: http://localhost:3000/feed?author=`

To get all articles filtered by tag run (in postman):

### `GET request to: http://localhost:3000/feed?tag=`

To get all articles filtered by storyTitle run (in postman):

### `GET request to: http://localhost:3000/feed?storyTitle=`

To get all articles with custom pagination run (in postman):

### `GET request to: http://localhost:3000/feed?limit=5&page=2`

To get one article based on id run (in postman):

### `GET request to: http://localhost:3000/feed/article/:id`

To delete one article based on id run (in postman):

### `DELETE request to: http://localhost:3000/feed/article/:id`

To delete the feed of articles run (in postman):

### `DELETE request to: http://localhost:3000/feed/`

## Tests

To run unit tests run:

### `npm run test`

## Swagger Documentation

### `http://localhost:3000/api/`