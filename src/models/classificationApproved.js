module.exports = (sequelize, DataTypes) => {
    const ClassificationApproved = sequelize.define(
        'ClassificationApproved',
        {
            ClassificationApprovedID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            ManualResultsID: {
                type: DataTypes.INTEGER,
            },
            ClassificationApproved: {
                type: DataTypes.BOOLEAN,
            },
            UserID: {
                type: DataTypes.INTEGER,
            },
            CreatedAt: {
                type: DataTypes.DATE,
            },
            UpdatedAt: {
                type: DataTypes.DATE,
            },
        },
    );
    // ClassificationApproved.associate = function (models) {
    //     // associations can be defined here
    // };
    return ClassificationApproved;
};
