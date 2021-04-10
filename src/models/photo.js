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
      CreatedAt: {
        type: DataTypes.NOW,
        default: new Date().getTime(),
      },
      UpdatedAt: {
        type: DataTypes.DATE,
      },
    }, {
      timestamps: false,
    },

  );
    // Photo.associate = function (models) {
    //   // associations can be defined here
    // };
  return Photo;
};
