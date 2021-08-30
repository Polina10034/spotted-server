module.exports = (sequelize, DataTypes) => {
  const SecoundSystemResult = sequelize.define(
    "SecoundSystemResult",
    {
      SecoundSystemResultID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      PhotoPath: {
        type: DataTypes.STRING,
      },
      IsRecognized: {
        type: DataTypes.BOOLEAN,
      },
      Results: {
        type: DataTypes.STRING,
      },
      CreatedAt: {
        type: DataTypes.DATE,
      },
      UpdatedAt: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      timestamps: false,
      hasTrigger: true,
    }
  );

  return SecoundSystemResult;
};
