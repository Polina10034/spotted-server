module.exports = (sequelize, DataTypes) => {
  const FirstSystemResult = sequelize.define(
    "FirstSystemResult",
    {
      FirstSystemResultID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      EncounterID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Count: {
        type: DataTypes.INTEGER,
      },
      FileName: {
        type: DataTypes.STRING,
      },
      IsIdentified: {
        type: DataTypes.BOOLEAN,
      },
      CreatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: false,
      hasTrigger: true,
    }
  );
  return FirstSystemResult;
};
