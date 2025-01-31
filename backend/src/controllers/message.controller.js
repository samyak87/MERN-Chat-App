// import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersforSidebar = async (req, res) => {
    try {
        const filteredUsers = await User.find({ _id: { $ne: req.user._id } }).select("-password");
        
        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getting users in sidebar "+error);
        res.status(500).json({ message: "Internal server error" });
        
    }
};