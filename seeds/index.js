const sequelize = require("../config/connection");
const blogPost = require("./blogPost");

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await blogPost();
    process.exit(0);
};

seedAll();