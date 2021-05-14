module.exports = (sequelize, DataTypes) => {
  const ManualResult = sequelize.define(
    'ManualResult',
    {
      ManualResultID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      PhotoPath: {
        type: DataTypes.STRING,
      },
      EncounterID: {
        type: DataTypes.INTEGER,
      },
      IndividualID: {
        type: DataTypes.INTEGER,
      },
      VerfiedBy: {
        type: DataTypes.INTEGER,
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
      hasTrigger: true,

    },

  );
    // IdentifiedEncounter.associate = function (models) {
    //   // associations can be defined here
    // };
  return ManualResult;
};
