module.exports = (sequelize, DataTypes) => {
  const IdentifiedEncounter = sequelize.define(
    'IdentifiedEncounter',
    {
      IdentifiedEncounterID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Photographer: {
        type: DataTypes.STRING,
      },

      EncounterID: {
        type: DataTypes.INTEGER,
      },
      LifeStageID: {
        type: DataTypes.INTEGER,
      },
      Sex: {
        type: DataTypes.STRING,
      },
      isAlive: {
        type: DataTypes.BOOLEAN,
      },
      TL: {
        type: DataTypes.INTEGER,
      },
      DL: {
        type: DataTypes.INTEGER,
      },
      DW: {
        type: DataTypes.INTEGER,
      },
      Distance: {
        type: DataTypes.INTEGER,
      },
      MaxDepth: {
        type: DataTypes.INTEGER,
      },
      Temp: {
        type: DataTypes.INTEGER,
      },
      Description: {
        type: DataTypes.STRING,
      },
      Link: {
        type: DataTypes.STRING,
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
    }, {
      classMethods: {
        associate(models) {
          // this.hasMany(models.Photo, { foreignKey: 'IdentifiedEncounterID' });
          this.belongsTo(models.User, { foreignKey: 'UpdatedBy' });
        },
      },
      timestamps: false,
      hasTrigger: true,

    },

  );
  IdentifiedEncounter.associate = (models) => {
    IdentifiedEncounter.belongsTo(models.User, { foreignKey: 'UpdatedBy' });
    IdentifiedEncounter.hasMany(models.Photo, { foreignKey: 'IdentifiedEncounterID' });
  };
  return IdentifiedEncounter;
};
