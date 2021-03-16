module.exports = (sequelize, DataTypes) => {
    const UserType = sequelize.define(
      'UserType',
      {
        UserTypeID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
          },
        UserType: {
          type: DataTypes.STRING,
        },
      },

    );
    // UserType.associate = function (models) {
    //   // associations can be defined here
    // };
    return UserType;
  };
  