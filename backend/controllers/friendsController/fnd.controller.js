import FriendStatus from "../../models/friendStatus.model.js";
export const friendStatus = async (req, res) => {
  try {
    console.log('req.user',req.user);
    const receiverId = req.params?.id;
    const senderId = req.user._id;
    let friendStatus = await FriendStatus.findOne({
      senderId: senderId,
      receiverId: receiverId,
    });
    if(!friendStatus) friendStatus = await new FriendStatus({
        senderId: senderId,
        receiverId: receiverId,
        status:'unfriend'
       }).save()
    if (friendStatus.status == "blocked")
      throw new Error("You can't send Request");
    const statusUpdate =
      friendStatus.status == "pending" ? "unfriend" : "pending";
       console.log('friendStatus',friendStatus);
    const result = await FriendStatus.findByIdAndUpdate({
      _id: friendStatus._id,
    }).set({ status: statusUpdate });
    res.status(201).json(`successfully request ${result.status == 'pending'?'sended':'cancelled'}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
