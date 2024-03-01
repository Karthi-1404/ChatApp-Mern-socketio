import FriendStatus from "../../models/friendStatus.model.js";
import mongoose from "mongoose";
export const friendList = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log('userId',new mongoose.Types.ObjectId(userId));
    const result = await FriendStatus.aggregate([
        {
            $match: {
                status: "friend", // Filter by status=accept
                $or: [
                    { receiverId: new mongoose.Types.ObjectId(userId) },
                    { senderId: new mongoose.Types.ObjectId(userId) }
                ]
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "receiverId",
                foreignField: "_id",
                as: "receiverDetails" // Populate receiver details in a field called receiverDetails
            }
        },
        {
            $unwind: "$receiverDetails" // Unwind the receiverDetails array
        },
        {
            $lookup: {
                from: "users",
                localField: "senderId",
                foreignField: "_id",
                as: "senderDetails" // Populate sender details in a field called senderDetails
            }
        },
        {
            $unwind: "$senderDetails" // Unwind the senderDetails array
        },
        {
            $project: {
                userDetails: {
                    $cond: {
                        if: { $eq: ["$receiverDetails._id", new mongoose.Types.ObjectId(userId)] },
                        then: "$senderDetails",
                        else: "$receiverDetails"
                    }
                }
            }
        }
    ]).exec()
    console.log('result',result);
    res.status(201).json(result);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
