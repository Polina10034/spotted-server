module.exports = (sequelize, DataTypes) => {
  const ManualResult = sequelize.define(
    'ManualResult',
    {
      ManualResultID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      EncounterID: {
        type: DataTypes.INTEGER,
      },
      RecognizedID: {
        type: DataTypes.INTEGER,
      },
      IdentifiedID: {
        type: DataTypes.INTEGER,
      },
      ClassificationApprovedID: {
        type: DataTypes.INTEGER,
      },
      // createdAt: {
      //   type: DataTypes.DATE,
      // },
      // updatedAt: {
      //   type: DataTypes.DATE,
      // }
    },

  );
    // IdentifiedEncounter.associate = function (models) {
    //   // associations can be defined here
    // };
  return ManualResult;
};
