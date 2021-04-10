module.exports = (sequelize, DataTypes) => {
  const Identified = sequelize.define(
    'Identified',
    {
      IdentifiedID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      ManualResultsID: {
        type: DataTypes.INTEGER,
      },
      IsIdentified: {
        type: DataTypes.BOOLEAN,
      },
      UserID: {
        type: DataTypes.INTEGER,
      },
      CreatedAt: {
        type: DataTypes.DATE,
      },
      UpdatedAt: {
        type: DataTypes.DATE,
      },
    },

  );
  // Identified.associate = function (models) {
  //   // associations can be defined here
  // };
  return Identified;
};
