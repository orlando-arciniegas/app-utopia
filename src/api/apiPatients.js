const { Op } = require("sequelize");
const {Patient} = require('../db/models');

const apiPatients = {
    list: async (req, res) => {

        Patient.findAll({
          include: ['budgets']
        })
            .then(patients => {

                let response = {
                    meta: {
                        status: 200,
                        total: patients.length,
                        url: "/api/patients"
                    },
                    data: patients
                }
                return res.status(200).json(response)
            })
    },
    find: async (req, res) => {

        try {

            const onePatient = await Patient.findOne({
                where: {
                    id: req.params.id
                }
            });

            res.status(200).json(onePatient);

        } catch (error) {
            console.log(error)
        }
    },
    edit: async (req, res) => {

        try {

            let Patient = {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address
            }

            await Patient.update(Patient, {
                where: {
                    id: req.params.id
                }
            });

            res.status(200).json("Paciente editado satisfactoriamente.");

        } catch (error) {
            console.log(error)
        }
    },
    destroy: async (req, res) => {

        try {

            await Patient.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json("Paciente eliminado satisfactoriamente.");

        } catch (error) {
            console.log(error)
        }
    },
}

module.exports = apiPatients;