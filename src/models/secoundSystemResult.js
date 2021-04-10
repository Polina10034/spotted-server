module.exports = (sequelize, DataTypes) => {
  const SecoundSystemResult = sequelize.define(
    'SecoundSystemResult',
    {
      SecoundSystemResultID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      PhotoID: {
        type: DataTypes.INTEGER,
      },
      IsRecognized: {
        type: DataTypes.BOOLEAN,
      },
      NumName: {
        type: DataTypes.INTEGER,
      },
    },

  );
    // SecoundSystemResult.associate = function (models) {
    //   // associations can be defined here
    // };
  return SecoundSystemResult;
};
