const { JWT_SECRET } = process.env;
const COIN_VALUES = [5, 10, 20, 50, 100];

//https://www.geeksforgeeks.org/find-maximum-path-length-in-a-binary-matrix
//https://www.geeksforgeeks.org/shortest-path-in-a-binary-maze

import jwt from "jsonwebtoken";
import { uuid } from "uuidv4";
import db from "../../db/index.js";
import { minPath } from "./bfs.js";

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env");
}

db.mongoose
  .connect(
    db.url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Connected to the database2!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const User = db.user;
const Maze = db.maze;

export const controllers = {
  fallback: (req, res) => {
    return res.status(401).json({ message: "Invalid endpoint or method" });
  },

  ping: (req, res) => {
    return res.status(200).json({ message: "Pong!" });
  },

  signup: async (req, res) => {
    try {
      let { username, password } = req.body;
      if (!(username && password)) {
        throw new Error("Username or password absent!");
      }
      let userId = uuid();
      let data = {
        username,
        password,
        userId
      };
      let user = new User({
        ...data
      });
      await user.save();
      let tokenData = {
        userId
      };
      let token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: "30m" });
      res.json({
        message: "Successful registration!",
        access_token: token
      });
    } catch (e) {
      console.log("signup error", e);
      res.send(`Signup error: ${e.message}`);
    }
  },

  signin: async (req, res) => {
    try {
      let { username, password } = req.body;
      if (!(username && password)) {
        throw new Error("Username or password absent!");
      }
      let user = await User.find({
        username,
        password
      });
      console.log("user", user);
      if (!(user.length > 0)) {
        throw new Error("Username not found!");
      }
      let { password: db_password, userId } = user[0];
      if (db_password != password) {
        throw new Error("Incorrect password!");
      }
      let tokenData = {
        userId
      };
      let token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: "30m" });
      res.json({
        message: "Successful authentication!",
        access_token: token
      });
    } catch (e) {
      console.log("signin error", e);
      res.send(`Signin error: ${e.message}`);
    }
  },

  createMaze: async (req, res) => {
    try {
      let { userId } = req.decode;
      if (!userId) {
        throw new Error("'userId' not validated");
      }
      let { gridSize: gridsize, walls, entrance } = req.body;
      if (!(userId && walls && entrance)) {
        throw new Error("One of required params not passed.");
      }
      let mazeId = uuid();
      let gridSize = gridsize.split("x").map(v => Number(v));
      let maze = new Maze({
        mazeId,
        gridSize,
        walls,
        entrance,
        ownerId: userId
      });
      console.log("maze", maze);
      await maze.save();
      return res.json({
        message: "Maze successfully created!",
        data: { mazeId }
      });
    } catch (e) {
      console.error("createMaze error", e);
      res.send(`createMaze error: ${e.message}`);
    }
  },

  //4608fced-c83b-4193-b176-65c21999aee7
  getSolution: async (req, res) => {
    try {
      let { userId } = req.decode;
      console.log("userId, role", userId);
      let { mazeId } = req.params;
      let { steps } = req.query;
      if (!(mazeId && steps)) {
        throw new Error("Either of 'mazeId or steps' not passed!");
      }
      let maze = await Maze.find({ mazeId });
      console.log("maze", maze);
      if (!(maze.length > 0)) {
        throw new Error("Maze not found!");
      }
      let result;
      if (steps === "min") {
        result = await minPath(maze[0]);
      } else if (steps === "max") {
        //
      } else {
        throw new Error("Ineligible value for 'steps' param!");
      }
      return res.json({
        path: result
      });
    } catch (e) {
      console.error("getSolution error", e);
      res.send(`getSolution error: ${e.message}`);
    }
  }
  //
  // putProduct: async (req, res) => {
  //   try {
  //     //step 1. check if we have userId & role
  // let { userId, role } = req.decode;
  // //console.log("userId, role", userId, role);
  // if (!(userId && role === "seller")) {
  //   throw new Error("'userId or role' not validated");
  // }
  //
  //     //step 2. parse productName & search for it
  //     let { productName, amountAvailable, cost, sellerId } = req.body;
  //     if (!productName) {
  //       throw new Error("required 'productName' param not passed!");
  //     } else {
  //       productName = productName.trim();
  //     }
  //     let product = await Product.find({
  //       productName
  //     });
  //     //console.log("product", product);
  //     if (!(product.length > 0)) {
  //       throw new Error("Product not found!");
  //     }
  //     let { sellerId: db_sellerId } = product[0];
  //
  //     //step 3. check role & requester is who created
  //     if (!(userId === db_sellerId && role === "seller")) {
  //       throw new Error("Either role or sellerId is ineligible!");
  //     }
  //
  //     //step 4.update
  //     let updateData = {};
  //     if (cost) {
  //       updateData["cost"] = Number(cost);
  //     } else if (amountAvailable) {
  //       updateData["amountAvailable"] = Number(amountAvailable);
  //     }
  //     await Product.findOneAndUpdate(
  //       { productName: productName },
  //       { ...updateData }
  //     );
  //     return res.status(200).json({ message: "Product successfully updated!" });
  //   } catch (e) {
  //     console.error("putProduct", e);
  //     res.send("putProduct error:", e.message);
  //   }
  // }
};