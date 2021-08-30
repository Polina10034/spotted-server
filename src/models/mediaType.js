module.exports = (sequelize, DataTypes) => {
  const MediaType = sequelize.define(
    "MediaType",
    {
      MediaTypeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      Title: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return MediaType;
};
