module.exports = (sequelize, DataTypes) => {
    const FirstSystemResult = sequelize.define(
        'FirstSystemResult',
        {
            FirstSystemResultID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            CreatedAt: {
                type: DataTypes.INTEGER,
                allowNull: false,
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
        },
    );
    // FirstSystemResult.associate = function (models) {
    //     // associations can be defined here
    // };
    return FirstSystemResult;
};
