import Follow from '../models/follow.model.js';

export const addFollow = async (req, res) => {
    const userId = req.params.userId;
    const id = req.userId;

    if (userId === id) {
        return res.status(400).json({ message: "You can't follow yourself" });
    }

    const isFollowing = await Follow.findOne({ follower: userId, following: id });
    if(isFollowing)
    {
        await Follow.findOneAndDelete({ follower: userId, following: id });
        return res.status(200).json({ message: "Unfollowed" });
    }else{
        await  Follow.create({ follower: userId, following: id });
        return res.status(200).json({ message: "Followed" });
    }
}