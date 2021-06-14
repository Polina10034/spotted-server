module.exports = (sequelize, DataTypes) => {
  const ReportType = sequelize.define(
    'ReportType',
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
      timestamps: false, // TODO remove & test
      hasTrigger: true,
    },
  );
  // ReportType.associate = (models) => {
  //   // ReportType.belongsTo(models.Encounter, { foreignKey: 'ReportTypeID' });
  // };
  return ReportType;
};
