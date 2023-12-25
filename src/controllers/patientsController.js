const { Op } = require('sequelize');
const { Patient } = require('../db/models');

const patientController = {
    store: async (req, res) => {
        try {
            res.render('./patients/save')
        } catch (error) {
            res.json(error)
        }
    },
    list: async (req, res) => {

        Patient.findAll({
            include: ['budgets']
        }).then(patients => {
            return res.render('./patients/filter', {
                patients
            })
        })
    },
    save: async (req, res) => {
        try {

            let newPatient = {
                dni: req.body.dni,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address
            }
            await Patient.create(newPatient);

            const successMsg = 'Paciente creado exitosamente';

            res.render('./patients/save', {
                successMsg
            })
        } catch (error) {
            res.render('./patients/save', {
                error
            })
        }
    },
    filter: async (req, res) => {

        if (req.query.filter) {

            Patient.findAll({
                where: {
                    [Op.or]: [{
                            name: {
                                [Op.like]: '%' + req.query.filter + '%'
                            }
                        },
                        {
                            dni: {
                                [Op.like]: '%' + req.query.filter + '%'
                            }
                        }
                    ]

                }
            }).then(patients => {

                return res.render('./patients/find', {
                    patients
                })
            })
        } else {
            res.render('./patients/find')
        }
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

            res.status(200).json('Paciente editado satisfactoriamente.');

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
            res.status(200).json('Paciente eliminado satisfactoriamente.');

        } catch (error) {
            console.log(error)
        }
    },
}

module.exports = patientController;