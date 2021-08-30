module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    CommentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    IdentifiedEncounterID: {
      type: DataTypes.INTEGER,
    },
    UserID: {
      type: DataTypes.INTEGER,
    },
    CommentText: {
      type: DataTypes.STRING,
    },
    CommentDate: {
      type: DataTypes.DATE,
    },
  });
  return Comments;
};
