import mongoose from "mongoose";

const postSchema = mongoose.Schema(
	{
		// author post
		postedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Post must have a author"],
		},
		text: {
			type: String,
			maxLength: [500,"You can't have more than 500 characters"],
		},
		img: {
			type: String,
		},
		likes: {
			// array of user ids
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User",
			default: [],
		},
		replies: [
			{
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
					required: true,
				},
				text: {
					type: String,
					required: true,
				},
				userProfilePic: {
					type: String,
				},
				username: {
					type: String,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

const Post = mongoose.model("Post", postSchema);

export default Post;
