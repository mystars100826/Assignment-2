const Service = require('../models/service');

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();

    const data = services.map((service) => ({
      title: service.title,
      description: service.description,
      id: service._id,
    }));

    res.status(200).json({
      success: true,
      message: 'Services list retrieved successfully.',
      data: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Service retrieved successfully.',
      data: {
        title: service.title,
        description: service.description,
        id: service._id,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createService = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newService = new Service({
      title,
      description,
    });

    const savedService = await newService.save();

    res.status(201).json({
      success: true,
      message: 'Service added successfully.',
      data: {
        title: savedService.title,
        description: savedService.description,
        id: savedService._id,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Service updated successfully.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};