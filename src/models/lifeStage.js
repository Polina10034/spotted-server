module.exports = (sequelize, DataTypes) => {
  const LifeStage = sequelize.define(
    "LifeStage",
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
    }
  );
  LifeStage.associate = (models) => {
    LifeStage.belongsTo(models.IdentifiedEncounter, {
      foreignKey: "LifeStageID",
    });
  };
  return LifeStage;
};
