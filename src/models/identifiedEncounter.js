module.exports = (sequelize, DataTypes) => {
  const IdentifiedEncounter = sequelize.define(
    "IdentifiedEncounter",
    {
      id: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.IdentifiedEncounterID}`;
        },
      },
      IdentifiedEncounterID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      LifeStageID: {
        type: DataTypes.INTEGER,
      },
      Gender: {
        type: DataTypes.STRING,
      },
      IsAlive: {
        type: DataTypes.BOOLEAN,
      },
      ProfilePicture: {
        type: DataTypes.STRING,
      },
      CreatedAt: {
        type: DataTypes.DATEONLY,
      },
      UpdatedAt: {
        type: DataTypes.DATEONLY,
      },
      UpdatedBy: {
        type: DataTypes.INTEGER,
      },
    },
    {
      classMethods: {
        associate(models) {
          this.belongsTo(models.User, { foreignKey: "UpdatedBy" });
        },
      },
      timestamps: false,
      hasTrigger: true,
    }
  );
  IdentifiedEncounter.associate = (models) => {
    IdentifiedEncounter.belongsTo(models.User, { foreignKey: "UpdatedBy" });
    IdentifiedEncounter.belongsTo(models.LifeStage, {
      foreignKey: "LifeStageID",
    });
    IdentifiedEncounter.hasMany(models.Photo, {
      foreignKey: "IdentifiedEncounterID",
    });
  };
  return IdentifiedEncounter;
};
