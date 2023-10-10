const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const commentData = require('./commentData.json');
const postData = require('./postData.json');

const seed = async () => {
    try {
        await sequelize.sync({ force: true });

        await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
        });
        await Post.bulkCreate(postData);
        await Comment.bulkCreate(commentData);

        console.log(`Seed is successful`);
        process.exit(0);
    } catch (err) {
        console.log(`Could not seed data, ${err}`);
        process.exit(1);
    }
};

seed();