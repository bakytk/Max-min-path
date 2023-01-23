import { describe, it } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/server/index.js";
const should = chai.should();
chai.use(chaiHttp);

//deposit, buy, one-crud

const agent = chai.request.agent(server);
let ACCESS_TOKEN = "";
let MAZE_ID = "";

before(function(done) {
  agent
    .post("/user")
    .set("content-type", "application/json")
    .send({
      username: `User-${Math.floor(Math.random() * 10000)}`,
      password: "1234"
    })
    .then(function(res) {
      ACCESS_TOKEN = res.body.access_token;
      done();
    })
    .catch(function(err) {
      done(err);
    });
});

describe("max-min path", function() {
  it("CREATE maze", function(done) {
    agent
      .post("/maze")
      .set("authorization", `Bearer ${ACCESS_TOKEN}`)
      .send({
        entrance: "A1",
        gridSize: "8x8",
        walls: [
          "C1",
          "G1",
          "A2",
          "C2",
          "E2",
          "G2",
          "C3",
          "E3",
          "B4",
          "C4",
          "E4",
          "F4",
          "G4",
          "B5",
          "E5",
          "B6",
          "D6",
          "E6",
          "G6",
          "H6",
          "B7",
          "D7",
          "G7",
          "B8"
        ]
      })
      .end(function(err, res) {
        //console.log("createMaze response", res.body.data);
        MAZE_ID = res.body.data.mazeId;
        res.should.have.status(200);
        done();
      });
  });

  it("GET solution", function(done) {
    agent
      .get(`/maze/${MAZE_ID}/solution?steps=min`)
      .set("authorization", `Bearer ${ACCESS_TOKEN}`)
      .send()
      .end(function(err, res) {
        //console.log("getSolution response", res.body.path);
        res.body.path.length.should.eq(10);
        done();
      });
  });
});

after(function() {
  agent.close();
});
