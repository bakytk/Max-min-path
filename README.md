<img src="https://i.ibb.co/xMptX8T/maze.webp" width="300"><br/><br/>

### Max-min path

##### Start & test

```
# start containers
docker-compose up --build
# curl commands listed below

# testing
docker compose -f docker-compose.yml build max_min
docker compose -f docker-compose.yml run max_min npm run test
```

##### Guidelines

- assume 'row x col' format for gridSize param

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

#4: get-product
curl --location --request GET 'http://localhost:15500/product' \
--header 'Content-Type: application/json' \
--data-raw '{"productName": "Coca-cola" }'

#5: put-product: eg. change 'cost' to 10
curl --location --request PUT 'http://localhost:15500/product' \
--header 'Content-Type: application/json' \
--data-raw '{"productName": "Coca-cola", "cost": 10}' \
--header 'Authorization: Bearer JWT_TOKEN'

#6: delete-product
curl --location --request DELETE 'http://localhost:15500/product' \
--header 'Content-Type: application/json' \
--data-raw '{"productName": "Coca-cola"}' \
--header 'Authorization: Bearer JWT_TOKEN'

#7: deposit
curl --location --request POST 'http://localhost:15500/deposit' \
--header 'Content-Type: application/json' \
--data-raw '{"coin": 100 }' \
--header 'Authorization: Bearer JWT_TOKEN'

#8: buy
curl --location --request POST 'http://localhost:15500/buy' \
--header 'Content-Type: application/json' \
--data-raw '{"productId": "9de15102-1f5e-4837-bc81-61cdc1c0816f", "amountProducts": 5 }' \
--header 'Authorization: Bearer JWT_TOKEN'

#9: reset
curl --location --request POST 'http://localhost:15500/reset' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer JWT_TOKEN'

#10: logout
curl --location --request POST 'http://localhost:15500/logout/all' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer JWT_TOKEN'
```
