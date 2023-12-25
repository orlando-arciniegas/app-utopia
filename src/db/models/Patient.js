module.exports = (sequelize, dataTypes) => {
  let alias = 'Patient';
  let cols = {
      id: {
        type: dataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      dni: {
        type: dataTypes.INTEGER,
        unique: true
      },
      name: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: dataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      address: {
        type: dataTypes.STRING(250),
        allowNull: false,
      }
  };
  let config = {
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: false
  }
  const Patient = sequelize.define(alias, cols, config);

  Patient.associate = function(models) {
      Patient.hasMany(models.Budget, { 
          as: "budgets", 
          foreignKey: "patient_id"
      })
  }

  return Patient
};