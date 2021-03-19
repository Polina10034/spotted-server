module.exports = (sequelize, DataTypes) => {
    const BoundingBox = sequelize.define(
        'BoundingBox',
        {
            BoundingBoxID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            PhotoID: {
                type: DataTypes.INTEGER,
            },
            Left_x: {
                type: DataTypes.STRING,
            },
            Top_y: {
                type: DataTypes.STRING,
            },
            Width: {
                type: DataTypes.STRING,
            },
            Height: {
                type: DataTypes.STRING,
            },
        },{
            timestamps: false,
          }
    
    );
    // BoundingBox.associate = function (models) {
    //     // associations can be defined here
    // };
    return BoundingBox;
};
