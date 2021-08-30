module.exports = (sequelize, DataTypes) => {
  const Encounter = sequelize.define(
    "Encounter",
    {
      id: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.EncounterID}`;
        },
      },
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
      Verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      ReportedBy: {
        type: DataTypes.INTEGER,
      },
      MediaTypeID: {
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
      TL: {
        type: DataTypes.INTEGER,
      },
      DL: {
        type: DataTypes.INTEGER,
      },
      DW: {
        type: DataTypes.INTEGER,
      },
      Distance: {
        type: DataTypes.INTEGER,
      },
      MaxDepth: {
        type: DataTypes.INTEGER,
      },
      Temp: {
        type: DataTypes.INTEGER,
      },
      Description: {
        type: DataTypes.STRING,
      },
      Link: {
        type: DataTypes.STRING,
      },
      Photographer: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      hasTrigger: true,
    }
  );

  Encounter.associate = (models) => {
    Encounter.belongsTo(models.Site, { foreignKey: "SiteID" });
    Encounter.belongsTo(models.User, { foreignKey: "ReportedBy" });
    Encounter.belongsTo(models.MediaType, { foreignKey: "MediaTypeID" });
    Encounter.belongsTo(models.ReportType, { foreignKey: "ReportTypeID" });
  };

  return Encounter;
};
