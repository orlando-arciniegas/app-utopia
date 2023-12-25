import { Router } from 'express';
import apiPatients from './apiPatients';

const router = Router();

router.get('/list', apiPatients.list);
router.get('/find/:id', patientsController.find);
router.put('/edit/:id', patientsController.edit);
router.delete('/delete/:id', patientsController.destroy);

module.exports = router;