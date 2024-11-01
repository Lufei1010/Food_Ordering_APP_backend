import { Request, Response } from "express";
import User from "../models/user";

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
  } 
  res.json(currentUser);
  }catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong"});
  }
};




// handle the POST request to create a new user at api/my/users
const createCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id }); // Check if the user already exists in the DB with auth0Id

    if (existingUser) {
      res.status(200).send(); // Do not return the response
      return;
    }

    const newUser = new User(req.body); //create
    await newUser.save(); //save to the database

    res.status(201).json(newUser.toObject()); // Send the newly created user as the response in JSON format

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" }); // Do not return the response
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId)

    if(!user){
      return res.status(404).json({ message: "User not found" })
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.country = country;
    user.city = city;

    await user.save();

    res.send(user);
  } catch (error) {
    console.log(error) //for debugging
    res.status(500).json({ message: "Error updating user" }); 
  }
}

export default {
  getCurrentUser,
  createCurrentUser,
  updateCurrentUser,
};
