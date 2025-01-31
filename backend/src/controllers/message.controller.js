import Message from "../models/message.model.js";
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


export const getMessages = async (req, res) => {
    try {
        const {id : userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        }).sort({ createdAt: -1 });
        
        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getting messages "+error);
        res.status(500).json({ message: "Internal server error" });
        
    }
};


export const sendMessage = async (req, res) => {
    try {
        const {id : receiverId} = req.params;
        const senderId = req.user._id;
        const { text,image } = req.body;
        
        let imageURL;
    
        // if user is sending image, then upload the image to cloudinary
        if(image)
        {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageURL = uploadResponse.secure_url;
        }
        
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageURL,
        });
    
    
        await newMessage.save();
        
        res.status(201).json(newMessage);
    
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Error in sending message "+error);
    }
   

};