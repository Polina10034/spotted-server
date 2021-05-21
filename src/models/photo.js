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
      // BackSide: {
      //   type: DataTypes.BOOLEAN,
      // },
      FirstSystemResultID: {
        type: DataTypes.INTEGER,
      },
      SecoundSystemResultID: {
        type: DataTypes.INTEGER,
      },
      EncounterGroupID: {
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
      timestamps: false,
      hasTrigger: true,

    },
  );

  return Photo;
};
