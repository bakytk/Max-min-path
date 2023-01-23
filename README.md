<img src="https://i.ibb.co/xMptX8T/maze.webp" width="300"><br/><br/>

### Max-min path

##### Guidelines

- assume 'row x col' format for gridSize param

##### Docker local development & testing

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
heroku git:remote -a <YOUR_HEROKU_APP_NAME>
heroku git:remote -a young-shelf-40889
```

##### Schemas

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
curl --location --request POST 'http://localhost:15500/user' --header 'Content-Type: application/json' --data-raw '{"username": "bak_buyer", "password": "1234", "role": "buyer"}'

curl --location --request POST 'http://localhost:15500/user' --header 'Content-Type: application/json' --data-raw '{"username": "bak_seller", "password": "1234", "role": "seller" }'

#2: sign-in
curl --location --request GET 'http://localhost:15500/user' --header 'Content-Type: application/json' --data-raw '{"username": "bak_seller", "password": "1234" }'

#3: create-product
curl --location --request POST 'http://localhost:15500/product' \
--header 'Content-Type: application/json' \
--data-raw '{"productName": "Coke", "cost": 5, "amountAvailable": 20 }' \
--header 'Authorization: Bearer JWT_TOKEN'
```
