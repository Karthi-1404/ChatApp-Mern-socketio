import mongoose from "mongoose";

const StatusEnum = Object.freeze({
  PENDING: "pending",
  FRIEND: "friend",
  REJECTED: "rejected",
  EXPIRED: "expired",
  BLOCKED: "blocked",
  UNFRIEND: "unfriend",
});

const friendsStatusSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: Object.values(StatusEnum), // Only allow values defined in the enum
      required: true,
    }
  },
  { timestamps: true }
);

const FriendStatus = mongoose.model("FriendStatus", friendsStatusSchema);

export default FriendStatus;
