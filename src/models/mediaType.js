module.exports = (sequelize, DataTypes) => {
  const MediaType = sequelize.define(
    'MediaType',
    {
      MediaTypeID: {
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
    },

  );
    // IdentifiedEncounter.associate = function (models) {
    //   // associations can be defined here
    // };
  return MediaType;
};
