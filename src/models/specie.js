module.exports = (sequelize, DataTypes) => {
    const Specie = sequelize.define(
      'Specie',
      {
        SpecieID: {
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
    );
    // Specie.associate = function (models) {
    //   // associations can be defined here
    // };
    return Specie;
  };
  