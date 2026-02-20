const Reference = require('../models/reference');

const getAllReferences = async (req, res) => {
  try {
    const references = await Reference.find();

    const data = references.map((ref) => ({
      firstname: ref.firstname,
      lastname: ref.lastname,
      email: ref.email,
      position: ref.position,
      company: ref.company,
      id: ref._id,
    }));

    res.status(200).json({
      success: true,
      message: 'References list retrieved successfully.',
      data: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getReferenceById = async (req, res) => {
  try {
    const reference = await Reference.findById(req.params.id);

    if (!reference) {
      return res.status(404).json({ success: false, message: 'Reference not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Reference retrieved successfully.',
      data: {
        firstname: reference.firstname,
        lastname: reference.lastname,
        email: reference.email,
        position: reference.position,
        company: reference.company,
        id: reference._id,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createReference = async (req, res) => {
  try {
    const { firstname, lastname, email, position, company } = req.body;

    const newReference = new Reference({
      firstname,
      lastname,
      email,
      position,
      company,
    });

    const savedReference = await newReference.save();

    res.status(201).json({
      success: true,
      message: 'Reference added successfully.',
      data: {
        firstname: savedReference.firstname,
        lastname: savedReference.lastname,
        email: savedReference.email,
        position: savedReference.position,
        company: savedReference.company,
        id: savedReference._id,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateReference = async (req, res) => {
  try {
    const reference = await Reference.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!reference) {
      return res.status(404).json({ success: false, message: 'Reference not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Reference updated successfully.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteReference = async (req, res) => {
  try {
    const reference = await Reference.findByIdAndDelete(req.params.id);

    if (!reference) {
      return res.status(404).json({ success: false, message: 'Reference not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Reference deleted successfully.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllReferences,
  getReferenceById,
  createReference,
  updateReference,
  deleteReference,
};