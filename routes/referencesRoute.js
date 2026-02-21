const express = require('express');
const router = express.Router();
const {
  getAllReferences,
  getReferenceById,
  createReference,
  updateReference,
  deleteReference,
} = require('../controllers/referencesController');

router.get('/', getAllReferences);
router.get('/:id', getReferenceById);
router.post('/', createReference);
router.put('/:id', updateReference);
router.delete('/:id', deleteReference);

module.exports = router;