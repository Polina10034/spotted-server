module.exports = (sequelize, DataTypes) => {
  const EncounterGroup = sequelize.define("EncounterGroup", {
    EncounterGroupID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    CountMedia: {
      type: DataTypes.INTEGER,
    },
    GroupName: {
      type: DataTypes.STRING,
    },
    EncounterID: {
      type: DataTypes.INTEGER,
    },
  });
  return EncounterGroup;
};
