module.exports = (sequelize, DataTypes) => {
  const Encounter = sequelize.define(
    'Encounter',
    {
      EncounterID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      EncounterDate: {
        type: DataTypes.DATE,
      },
      SiteID: {
        type: DataTypes.INTEGER,
      },
      ManualResultsID: {
        type: DataTypes.INTEGER,
      },
      Verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      ReportedBy: {
        type: DataTypes.INTEGER,
      },
      MediaType: {
        type: DataTypes.INTEGER,
      },
      SpottedCount: {
        type: DataTypes.INTEGER,
      },
      SpottedCountReported: {
        type: DataTypes.INTEGER,
      },
      ReporterEmail: {
        type: DataTypes.STRING,
      },
      ProfilePicture: {
        type: DataTypes.STRING,
      },
      OriginalID: {
        type: DataTypes.STRING,
      },
      CreatedAt: {
        type: DataTypes.DATE,
      },
      UpdatedAt: {
        type: DataTypes.DATE,
      },
      UpdatedBy: {
        type: DataTypes.INTEGER,
      },
      IsPregnant: {
        type: DataTypes.BOOLEAN,
        defaultValue: null,
      },
      IsActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      Gender: {
        type: DataTypes.STRING,
      },
      ReportTypeID: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false, // TODO remove & test
      hasTrigger: true,
    },

  );

  Encounter.associate = (models) => {
    Encounter.belongsTo(models.Site, { foreignKey: 'SiteID' });
  };

  return Encounter;
};
