module.exports = (sequelize, DataTypes) => {
  const LifeStage = sequelize.define(
    'LifeStage',
    {
      LifeStageID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      Stage: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    },

  );
    // IdentifiedEncounter.associate = function (models) {
    //   // associations can be defined here
    // };
  return LifeStage;
};
