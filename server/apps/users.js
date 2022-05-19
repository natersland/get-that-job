import { ObjectId } from "mongodb";
import { Router } from "express";
import { db } from "../utils/db.js";
// Schema Medels ---------------------
import UsersProfessional from "../models/UsersProfessional.js";
import UsersRecruiter from "../models/UsersRecruiter.js";
// -----------------------------------

const usersRouter = Router();
const collection = db.collection("users");

// CREATE User Data ----------------------------
usersRouter.post("/create/professional", async (req, res) => {
  try {
    const newProfessional = new UsersProfessional(req.body);
    await db.collection("users").insertOne(newProfessional);
    res.status(200).json(`New professional has been created successful!`);
    console.log(newProfessional);
  } catch (error) {
    res.status(500).json(error);
  }
});
usersRouter.post("/create/recruiter", async (req, res) => {
  try {
    const newRecruiter = new UsersRecruiter(req.body);
    await db.collection("users").insertOne(newRecruiter);
    /*  const user = await collection
      .aggregate([
        {
          $addFields: {
            userId: {
              $toString: "$_id",
            },
          },
        },
        {
          $project: {
            email: 1,
            feeds: { $concatArrays: ["$feeds", "$shared_feeds"] },
          },
        },
      ]) */
    /* .toArray() */ res
      .status(200)
      .json(`New recruiter has been created successful!`);
    console.log(newRecruiter);
    /*    res.status(200).json(user[0]);
    console.log(user[0]); */
  } catch (error) {
    res.status(500).json(error);
  }
});
// UPDATE User Data ----------------------------
usersRouter.put("/:id", async (req, res) => {
  try {
    const userId = ObjectId(req.params.id);
    const updateUserData = {
      ...req.body,
    };
    await collection.updateOne({ _id: userId }, { $set: updateUserData });
    res.status(200).json(`User ${userId} has been updated successful`);
    console.log(`Updated user data id:${userId} successful!`);
  } catch (error) {
    res.status(500).json(error);
  }
});
// DELETE User Data ----------------------------
usersRouter.delete("/:id", async (req, res) => {
  try {
    const userId = ObjectId(req.params.id);
    await collection.deleteOne({ _id: userId });
    res.status(200).json("User is has been deleted successful");
    console.log(`User ${userId} has been deleted successful`);
  } catch (error) {
    res.status(500).json(error);
  }
});
// GET One User Data ----------------------------
usersRouter.get("/:id", async (req, res) => {
  try {
    const userId = ObjectId(req.params.id);
    const user = await collection.find({ _id: userId }).toArray();
    /*   const user = await collection
      .aggregate([
        {
          $addFields: {
            userId: {
              $toString: "$_id",
            },
          },
        },
      ])
      .toArray(); */

    res.status(200).json(user[0]);
    console.log(user[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});
// GET All User Data ----------------------------
usersRouter.get("/", async (req, res) => {
  try {
    const users = await collection.find().toArray();
    res.status(200).json(users);
    console.log(`Get all users data has been successful!`);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default usersRouter;
