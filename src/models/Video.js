module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define(
    'Video',
    {
      VideoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      EncounterID: {
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
    {
      timestamps: false,
    },

  );
  return Video;
};
