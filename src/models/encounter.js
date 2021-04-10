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
 
    }, {
      timestamps: false, // TODO remove & test
    },

  );
    // Encounter.associate = function (models) {
    //   Encounter.hasMany(models.Photo, {
    //     foreignKey: {
    //       name: 'EncounterID',
    //       allowNull: false
    //     }
    //   })    };
  return Encounter;
};
