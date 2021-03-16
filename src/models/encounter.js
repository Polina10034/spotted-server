module.exports = (sequelize, DataTypes) => {
    const Encounter = sequelize.define(
      'Encounter',
      {
        EncounterDate: {
          type: DataTypes.DATE,
        },
        EncounterID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
          },
        SiteID: {
          type: DataTypes.INTEGER,
        },
        IdentifiedEncounterID: {
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
      },{
        timestamps: false,
      }

    );
    // Encounter.associate = function (models) {
    //   // associations can be defined here
    // };
    return Encounter;
  };
  