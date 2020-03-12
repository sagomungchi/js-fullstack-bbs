module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define('author', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING
      },
      {
        freezeTableName: true,
      }
    );
  
    Author.associate = (models) => {
      Author.hasMany(models.post);
    };
  
    return Author;
  }