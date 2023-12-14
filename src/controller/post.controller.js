const sequelize = require('sequelize');
const Sequelize = require('../services/db');
const userModel = require('../model/user')(Sequelize, sequelize);
const postsModel = require('../model/posts')(Sequelize, sequelize);
const followerModel = require('../model/followers')(Sequelize, sequelize);

class PostController {

    createNewPost = async (req, res, next) => {

        let {
            post
        } = req.body;

        let user_id=req.user.id;

        if (!post) {
            return res.status(400).json({
                error: 'post is required.'
            });
        }


        if(post.length > 280 || post.length < 1)
        {
            return res.status(400).json({
                error: 'post length should be limited to between 1 & 280 characters.'
            });  
        }

        let createNewPost = await postsModel.create({
            content:post,
            user_id
        })

        if(!createNewPost)
        {
            return res.status(400).send(
                'something went wrong! Please try again.'
            )
        }

        res.status(200).send(
            'Post successfully created!'
        )

    }
    getUserFeed = async (req, res, next) => {

        let user_id = req.user.id;

        let allFollowersList = await followerModel.findAll({
            where:{
                user_id
            },
            raw:true
        })

        let allFollowersListOnlyId = allFollowersList.map((data)=>data.follower_user_id);

        let userListIncludingSelf = [...allFollowersListOnlyId,user_id];

        let feed = await postsModel.findAll({
            where: {
                user_id: userListIncludingSelf
            },
            order: [['created_at', 'DESC']],
            raw: true
        })

        res.status(200).send({
            feed
        })


    }
    followUser = async (req, res, next) => {

        let {
            follower_user_id
        } = req.body;

        let user = req.user;

        if (!follower_user_id) {
            return res.status(404).json({
                error: 'follower_user_id is required!'
            });
        }

        let followerProfile = await userModel.findOne({
            where: {
                id: follower_user_id
            }
        })

        if (!followerProfile) {
            return res.status(404).json({
                error: 'follower_user_id does not exists.'
            });
        }

        if (followerProfile.id == user.id) {
            return res.status(400).json({
                error: "user cannot follow own's account."
            });
        }

        let checkIfAlreadyFollowing = await followerModel.findOne({
            where: {
                user_id: user.id,
                follower_user_id: follower_user_id
            },
            raw: true
        })

        if (checkIfAlreadyFollowing) {
            return res.status(400).json({
                error: "account is already contains in follower list."
            });
        }

        let createFollowerRecord = await followerModel.create({
            user_id: user.id,
            follower_user_id
        })

        if (!createFollowerRecord) {
            return res.status(400).json({
                error: "account could not be followed! Please try again."
            });
        }

        res.status(200).send(
            'account followed successfully!'
        )

    }
    unFollowUser = async (req, res, next) => {

        let {
            follower_user_id
        } = req.body;

        let user = req.user;
        
        if (!follower_user_id) {
            return res.status(404).json({
                error: 'follower_user_id is required!'
            });
        }

        let followerProfile = await userModel.findOne({
            where: {
                id: follower_user_id
            }
        })

        if (!followerProfile) {
            return res.status(404).json({
                error: 'follower_user_id does not exists.'
            });
        }

        if (followerProfile.id == user.id) {
            return res.status(400).json({
                error: "user cannot unfollow own's account."
            });
        }

        let checkIfAlreadyFollowing = await followerModel.findOne({
            where: {
                user_id: user.id,
                follower_user_id: follower_user_id
            },
            raw: true
        })

        if (!checkIfAlreadyFollowing) {
            return res.status(400).json({
                error: "account is not following given follower_user_id"
            });
        }

        let deleteFollowerRecord = await followerModel.destroy(
        {
            where:{
                user_id: user.id,
                follower_user_id
            }
        }
        )

        if (!deleteFollowerRecord) {
            return res.status(400).json({
                error: "account could not be unfollowed Please try again."
            });
        }

        res.status(200).send(
            'account unfollowed successfully!'
        )

    }


}

module.exports = new PostController;