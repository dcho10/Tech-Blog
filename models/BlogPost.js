// Set up sequelize connection
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class BlogPost extends Model {}

// Initialize BlogPost table and their values
BlogPost.init(
    {   
        // Set up primary key
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // Mandatory title value
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Mandatory post value
        post: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Generate date based on exact moment in time
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        // Establish user_id foreign key
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "blogpost"
    }
);

module.exports = BlogPost;