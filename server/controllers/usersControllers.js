import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";
import bcrypt from "bcrypt";
import multer from "multer";
import { cloudinaryUploadLogo } from "../utils/upload.js";
// Schema Medels ---------------------
import RecruiterModel from "../models/RecruiterModel.js";
import ProfessionalModel from "../models/ProfessionalModel.js";
// Database ---------------------------
const usersCollection = db.collection("users");

// GET - ดึงข้อมูล user คนเดียว ---------------------------------------
export const getOneUserData = async (req, res, next) => {
  try {
    const userId = ObjectId(req.params.id);
    /*     const user = await usersCollection.find({ _id: userId }).toArray();
     */
    /*   const user = await usersCollection
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
    const user = await usersCollection
      .aggregate([
        {
          $lookup: {
            from: "jobs",
            localField: "_id",
            foreignField: "recruiterId",
            as: "jobs",
          },
        },
        {
          $lookup: {
            from: "applications",
            localField: "_id",
            foreignField: "professionalId",
            as: "applications",
          },
        },
        /*         { $unwind: "$applications" },
         */ {
          $lookup: {
            from: "jobs",
            localField: "applications.jobId",
            foreignField: "_id",
            as: "jobDetail",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "jobDetail.recruiterId",
            foreignField: "_id",
            as: "companyDetail",
          },
        },

        /*  {
          $lookup: {
            from: "jobs",
            localField: "_id",
            foreignField: "recruiterId",
            as: "jobs",
          },
        },
        { $unwind: "jobs" },
        {
          $lookup: {
            from: "applications",
            localField: "jobs._id",
            foreignField: "jobId",
            as: "status",
          },
        }, */
        { $match: { _id: userId } },
      ])
      .toArray();
    res.status(200).json(user[0]);
  } catch (error) {
    next(error);
  }
};

// GET - ดึงข้อมูล user ทั้งหมด ---------------------------------------
export const getAllUserData = async (req, res, next) => {
  try {
    const users = await usersCollection.find().toArray();
    /* const users = await usersCollection
      .aggregate([
        {
          $lookup: {
            from: "jobs",
            localField: "_id",
            foreignField: "recruiterId",
            as: "jobs",
          },
        },
      ])
      .toArray(); */
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// PUT - อัพเดต User 1 คน ----------------------------
// Multer & collection for update user data
const multerUpload = multer({ dest: "upload/" });
export const uploadFile = multerUpload.fields([
  { name: "logoFile", maxCount: 1 },
]);
export const updateOneUser = async (req, res, next) => {
  try {
    const userId = ObjectId(req.params.id);
    const updateUserData = {
      ...req.body,
    };
    const logoFileUrl = await cloudinaryUploadLogo(req.files);
    user["companyLogo"] = logoFileUrl;

    await usersCollection
      .aggregate([
        {
          $lookup: {
            from: "jobs",
            localField: "_id",
            foreignField: "recruiterId",
            as: "jobs",
          },
        },
        { $match: { _id: userId } },
      ])
      .updateOne({ _id: userId }, { $set: updateUserData });
    res.status(200).json(`User ${userId} has been updated successful`);
    console.log(`Updated user data id:${userId} successful!`);
  } catch (error) {
    next(error);
  }
};

// PATCH - เปลี่ยนรหัส user 1 คน ---------------------------------------
export const changeUserPassWord = async (req, res, next) => {
  try {
    const userId = ObjectId(req.params.id);
    const userData = {
      password: req.body.password,
    };
    // hashing password
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    await usersCollection.updateOne({ _id: userId }, { $set: userData });
    res.status(200).json(`User ${userId} has been updated successful`);
    console.log(`Updated user data id:${userId} successful!`);
  } catch (error) {
    next(error);
  }
};
// PATCH - อัพเดต following job ---------------------------------------
export const followingJobUpdate = async (req, res, next) => {
  try {
    const userId = ObjectId(req.params.id);
    const userFollowingData = await usersCollection
      .findOne({ _id: userId })
      .toArray();

    let userData = {};
    if (req.body.mode === "follow") {
      let temp = [
        ...userFollowingData.followingJobs,
        req.body.userFollowingData,
      ];
      userData = temp;
    } else if (req.body.mode === "unfollow") {
      const unfollowJobId = req.body.userFollowingData;
      const result = userFollowingData.filter((jobId, index) => {
        if (unfollowJobId === jobId) {
          jobId.splice(index, 1);
        }
        return result;
      });
      userData = { followingJobs: req.body.result };
    }

    await usersCollection.updateOne({ _id: userId }, { $set: userData });
    res.status(200).json(`User ${userId} has been updated successful`);
    console.log(`Updated user data id:${userId} successful!`);
  } catch (error) {
    next(error);
  }
};
