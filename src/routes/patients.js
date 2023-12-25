import {Router} from 'express';
import patientsController from '../controllers/patientsController';

const router = Router();

router.get('/list', patientsController.list);
router.get('/save', patientsController.store);
router.post('/save', patientsController.save);
router.get('/filter', patientsController.filter);
router.get('/filter/:id', patientsController.find);
router.put('/edit/:id', patientsController.edit);
router.delete('/delete/:id', patientsController.destroy);

module.exports = router;