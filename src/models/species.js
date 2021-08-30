module.exports = (sequelize, DataTypes) => {
  const Species = sequelize.define(
    "Species",
    {
      SpeciesID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      CommonName: {
        type: DataTypes.STRING,
      },
      CommonNameHebrew: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return Species;
};
