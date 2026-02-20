const Project = require('../models/project');

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    const data = projects.map((project) => ({
      title: project.title,
      completion: project.completion,
      description: project.description,
      id: project._id,
    }));

    res.status(200).json({
      success: true,
      message: 'Projects list retrieved successfully.',
      data: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Project retrieved successfully.',
      data: {
        title: project.title,
        completion: project.completion,
        description: project.description,
        id: project._id,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const { title, completion, description } = req.body;

    const newProject = new Project({
      title,
      completion,
      description,
    });

    const savedProject = await newProject.save();

    res.status(201).json({
      success: true,
      message: 'Project added successfully.',
      data: {
        title: savedProject.title,
        completion: savedProject.completion,
        description: savedProject.description,
        id: savedProject._id,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};