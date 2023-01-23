<img src="https://i.ibb.co/xMptX8T/maze.webp" width="300"><br/><br/>

### Max-min path

##### Guidelines

- assume 'row x col' format for gridSize param

##### Docker local development & Testing

```
# start containers
docker-compose up --build
# curl commands listed below

# testing
docker compose -f docker-compose.yml build max_min
docker compose -f docker-compose.yml run max_min npm run test
```

##### Heroku local development and Deployment

```
# local dev
heroku local web

# deploy
heroku create
git remote add heroku <YOUR_HEROKU_GIT_REMOTE_URL>
git add .
git commit -m 'push repo'
git push heroku main

# public-url:
https://young-shelf-40889.herokuapp.com
```

##### Mongo schemas

```
User {
userId,
username,
password
}

Maze {
mazeId,
gridSize,
walls,
entrance,
ownerId
}
```

##### cURL commands

```
#1: sign-up:
curl --location --request POST 'http://localhost:15500/register' --header 'Content-Type: application/json' --data-raw '{"username": "john", "password": "1234"}'

#2: sign-in
curl --location --request POST 'http://localhost:15500/login' --header 'Content-Type: application/json' --data-raw '{"username": "john", "password": "1234" }'

#3: create-maze
curl --location --request POST 'http://localhost:15500/maze' --header 'Content-Type: application/json' --data-raw '{"entrance": "A1", "gridSize": "8x8", "walls": ["C1", "G1", "A2", "C2", "E2", "G2", "C3", "E3", "B4", "C4", "E4", "F4", "G4", "A6", "E5", "B6", "H2", "D6", "E6", "G6", "H6", "B7", "D7", "G7", "B8"] }' --header 'Authorization: Bearer JWT_TOKEN'

#4: get-solution
curl --location --request GET 'http://localhost:15500/maze/<maze_id>/solutions?steps=min' --header 'Content-Type: application/json' --header 'Authorization: Bearer JWT_TOKEN'

#5: get-maze
curl --location --request GET 'http://localhost:15500/maze' --header 'Content-Type: application/json' --header 'Authorization: Bearer JWT_TOKEN' --data-raw '{"mazeId": <maze_id>}'
```
