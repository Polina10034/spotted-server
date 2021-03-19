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
        UploadDate: {
          type: DataTypes.DATE,
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
        PathPhoto: {
            type: DataTypes.STRING,
        },
      },{
        timestamps: false,
      }

    );
    // Photo.associate = function (models) {
    //   // associations can be defined here
    // };
    return Photo;
  };
  