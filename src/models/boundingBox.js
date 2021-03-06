module.exports = (sequelize, DataTypes) => {
  const BoundingBox = sequelize.define(
    "BoundingBox",
    {
      BoundingBoxID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      FirstSystemResultID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PhotoID: {
        type: DataTypes.STRING,
      },
      Left_x: {
        type: DataTypes.STRING,
      },
      Top_y: {
        type: DataTypes.STRING,
      },
      Width: {
        type: DataTypes.STRING,
      },
      Height: {
        type: DataTypes.STRING,
      },
      Confidence: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      classMethods: {
        associate(models) {
          BoundingBox.belongsTo(models.Photos, {
            targetKey: "PhotoID",
            foreignKey: "PhotoID",
          });
        },
      },
    }
  );
  return BoundingBox;
};
