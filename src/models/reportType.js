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
    );
    // ReportType.associate = function (models) {
    //   // associations can be defined here
    // };
    return ReportType;
  };
  