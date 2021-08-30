module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define(
    "Site",
    {
      SiteID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      SiteName: {
        type: DataTypes.STRING,
      },
      Country: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return Site;
};
