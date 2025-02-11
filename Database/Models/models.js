import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

const User = mongoose.model("User", UserSchema);

const ItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    trim: true,
  },
});

const Item = mongoose.model("Item", ItemSchema);

export { User, Item };
