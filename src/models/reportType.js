module.exports = (sequelize, DataTypes) => {
  const ReportType = sequelize.define(
    "ReportType",
    {
      ReportTypeID: {
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
      hasTrigger: true,
    }
  );

  return ReportType;
};
