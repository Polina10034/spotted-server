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
      VideoPath: {
        type: DataTypes.STRING,
      },
      CreatedAt: {
        type: DataTypes.DATE,
      },
      UpdatedAt: {
        type: DataTypes.DATE,
      },
    },

  );
    // Video.associate = function (models) {
    //   // associations can be defined here
    // };
  return Video;
};
