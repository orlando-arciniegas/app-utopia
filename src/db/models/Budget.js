module.exports = (sequelize, dataTypes) => {
    let alias = 'Budget'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        treatment: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        total: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: dataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: dataTypes.DATE,
            allowNull: false,
        },
        patient_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: false
    }
    const Budget = sequelize.define(alias, cols, config);

    Budget.associate = function (models) {
        Budget.belongsTo(models.Patient, {
            as: "patients",
            foreignKey: "patient_id"
        })
    }

    return Budget
};