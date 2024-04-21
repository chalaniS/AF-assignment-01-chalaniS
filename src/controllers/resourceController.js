const Resource = require('../models/Resource');

// Create a new resource
exports.createResource = async (req, res) => {
    try {
        const { name, type, quantity } = req.body;
        const newResource = new Resource({ name, type, quantity });
        await newResource.save();
        res.status(201).json({ message: 'Resource created successfully', resource: newResource });
    } catch (error) {
        console.error('Error in createResource:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all resources
exports.getAllResources = async (req, res) => {
    try {
        const resources = await Resource.find();
        res.status(200).json({ resources });
    } catch (error) {
        console.error('Error in getAllResources:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a single resource by ID
exports.getResourceById = async (req, res) => {
    try {
        const { id } = req.params;
        const resource = await Resource.findById(id);
        if (!resource) {
            return res.status(404).json({ error: 'Resource not found' });
        }
        res.status(200).json({ resource });
    } catch (error) {
        console.error('Error in getResourceById:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a resource
exports.updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, quantity } = req.body;
        const updatedResource = await Resource.findByIdAndUpdate(id, { name, type, quantity }, { new: true });
        if (!updatedResource) {
            return res.status(404).json({ error: 'Resource not found' });
        }
        res.status(200).json({ message: 'Resource updated successfully', resource: updatedResource });
    } catch (error) {
        console.error('Error in updateResource:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a resource
exports.deleteResource = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedResource = await Resource.findByIdAndDelete(id);
        if (!deletedResource) {
            return res.status(404).json({ error: 'Resource not found' });
        }
        res.status(200).json({ message: 'Resource deleted successfully' });
    } catch (error) {
        console.error('Error in deleteResource:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
