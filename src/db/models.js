export const Maze = mongoose => {
  var mazeSchema = mongoose.Schema({
    mazeId: {
      type: String,
      required: true,
      unique: true
    },
    gridSize: {
      type: [
        {
          type: Number
        }
      ],
      required: true,
      validate: {
        validator: function(input) {
          return input.length === 2;
        },
        message: "gridSize is 2-number array"
      }
    },
    walls: {
      type: [
        {
          type: String
        }
      ],
      required: true
    },
    entrance: {
      type: String,
      required: true
    },
    min: {
      type: [
        {
          type: String
        }
      ]
    },
    max: {
      type: [
        {
          type: String
        }
      ]
    },
    ownerId: {
      type: String,
      required: true
    }
  });
  return mongoose.model("Maze", mazeSchema);
};

//add constraint that role is either "buyer" or "seller"
export const User = mongoose => {
  var userSchema = mongoose.Schema({
    userId: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  });
  return mongoose.model("User", userSchema);
};
