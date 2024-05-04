// Set up sequelize connection
const { Model, DataTypes } = require("sequelize");
const sequelize = require ("../config/connection");

class Comment extends Model {}

// Initialize Comment table and their values
Comment.init(
    {   
        // Set up primary key
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // Mandatory comment value
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Establish user_id foreign key
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        },
        // Establish blogpost_id foreign key
        blogpost_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "blogpost",
                key: "id"
            }
        },
        // Generate date based on exact moment in time
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "comment"
    }
);

module.exports = Comment;