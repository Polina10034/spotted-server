module.exports = (sequelize, DataTypes) => {
  const Recognized = sequelize.define("Recognized", {
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
    CreatedAt: {
      type: DataTypes.DATE,
    },
    UpdatedAt: {
      type: DataTypes.DATE,
    },
  });

  return Recognized;
};
