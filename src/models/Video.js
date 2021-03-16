module.exports = (sequelize, DataTypes) => {
    const Video = sequelize.define(
      'Video',
      {
        VideoID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
          },
        EncounterID: {
          type: DataTypes.INTEGER,
        },
        Title: {
            type: DataTypes.STRING,
          },
        CountPerImage: {
            type: DataTypes.INTEGER,
          },
        UploadDate: {
            type: DataTypes.DATE,
          },
        VideoPath: {
            type: DataTypes.STRING,
          },
      },

    );
    // Video.associate = function (models) {
    //   // associations can be defined here
    // };
    return Video;
  };
  