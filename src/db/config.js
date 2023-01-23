const {
  DB_USER,
  DB_PWD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DOCKER_ENV,
  MONGODB_URI
} = process.env;

let CONNECTION_URL = "";

if (DOCKER_ENV) {
  CONNECTION_URL =
    `mongodb://${DB_USER}:${DB_PWD}@` +
    `${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
} else {
  CONNECTION_URL = MONGODB_URI;
}

export default {
  url: CONNECTION_URL
};
