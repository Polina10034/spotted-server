module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define(
    'Photo',
    {
      PhotoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      EncounterID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      CountPerImage: {
        type: DataTypes.INTEGER,
      },
      RightSide: {
        type: DataTypes.BOOLEAN,
      },
      LeftSide: {
        type: DataTypes.BOOLEAN,
      },
      FrontSide: {
        type: DataTypes.BOOLEAN,
      },
      TopSide: {
        type: DataTypes.BOOLEAN,
      },
      FirstSystemResultID: {
        type: DataTypes.INTEGER,
      },
      SecoundSystemResultID: {
        type: DataTypes.INTEGER,
      },
      src: {
        type: DataTypes.STRING,
        field: 'PathPhoto',
      },
      IdentifiedEncounterID: {
        type: DataTypes.INTEGER,
      },
      CreatedAt: {
        type: DataTypes.DATE,
      },
      UpdatedAt: {
        type: DataTypes.DATE,
      },
    }, {
      // classMethods: {
      //   associate(models) {
      //     this.hasOne(models.Encounter, { foreignKey: 'EncounterID' });
      //     // this.belongsTo(models.Encounter, { foreignKey: 'EncounterID' });
      //     this.belongsTo(models.IdentifiedEncounterID, { foreignKey: 'IdentifiedEncounterID' });
      //   },
      // },
      timestamps: false,
      hasTrigger: true,

    },
  );
  Photo.associate = (models) => {
    Photo.belongsTo(models.Encounter, { foreignKey: 'EncounterID' });
  };
  return Photo;
};
