module.exports = (sequelize, DataTypes) => {
  const Recognized = sequelize.define(
    'Recognized',
    {
      RecognizedID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      ManualResultsID: {
        type: DataTypes.INTEGER,
      },
      IsRecognized: {
        type: DataTypes.BOOLEAN,
      },
      UserID: {
        type: DataTypes.INTEGER,
      },
      EnterDate: {
        type: DataTypes.DATE,
      },
    },
  );
    // Recognized.associate = function (models) {
    //   // associations can be defined here
    // };
  return Recognized;
};
