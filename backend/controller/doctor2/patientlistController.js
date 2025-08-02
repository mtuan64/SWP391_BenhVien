// patientlistController.js
const mongoose = require('mongoose');
const ProcedureRequest = require('../../models/ProcedureRequest');
const Employee = require('../../models/Employee');
const testParameters = require('../../config/testParameters'); // Import testParameters

exports.getProcedureRequestsForDoctor2 = async (req, res) => {
    try {
        const { doctorId2 } = req.params;

        // Validate doctorId2
        if (!mongoose.Types.ObjectId.isValid(doctorId2)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Doctor2 ID format'
            });
        }

        // Verify doctor exists
        const doctorExists = await Employee.findById(doctorId2).select('_id');
        if (!doctorExists) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        // Find procedure requests
        const procedureRequests = await ProcedureRequest.find({
            'services.doctorId2': doctorId2
        })
            .populate({
                path: 'profileId',
                select: 'name identityNumber',
                match: { deletedAt: null }
            })
            .populate({
                path: 'doctorId',
                select: 'name',
                match: { deletedAt: null }
            })
            .populate({
                path: 'services.serviceId',
                select: 'name price',
                match: { deletedAt: null }
            })
            .lean()
            .select('medicalRecordId status requestedAt createdAt updatedAt services')
            .sort({ requestedAt: -1 });

        if (!procedureRequests.length) {
            return res.status(404).json({
                success: false,
                message: 'No procedure requests found for this doctor'
            });
        }

        // Format response
        const formattedRequests = procedureRequests
            .map(request => {
                const validServices = request.services.filter(service =>
                    service.doctorId2 && service.doctorId2.toString() === doctorId2
                );

                if (!validServices.length) return null;

                return {
                    _id: request._id,
                    medicalRecordId: request.medicalRecordId || null,
                    profile: {
                        name: request.profileId?.name || 'N/A',
                        identityNumber: request.profileId?.identityNumber || 'N/A'
                    },
                    referringDoctor: {
                        name: request.doctorId?.name || 'N/A'
                    },
                    services: validServices.map(service => ({
                        _id: service._id || null,
                        serviceId: service.serviceId?._id || null,
                        serviceName: service.serviceId?.name || 'N/A',
                        servicePrice: service.serviceId?.price || 0,
                        scheduledTime: service.scheduledTime || null,
                        status: service.status || 'N/A',
                        doctorId: service.doctorId2 || null,
                        resultNote: service.resultNote || 'N/A',
                        resultFile: service.resultFile || null,
                        testType: service.testType || 'N/A',
                        testParameters: testParameters[service.testType] || [] // Include test parameters
                    })),
                    status: request.status || 'N/A',
                    requestedAt: request.requestedAt || null,
                    createdAt: request.createdAt || null,
                    updatedAt: request.updatedAt || null
                };
            })
            .filter(request => request !== null);

        res.status(200).json({
            success: true,
            total: formattedRequests.length,
            data: formattedRequests,
            message: 'Procedure requests retrieved successfully'
        });
    } catch (error) {
        console.error('Error fetching procedure requests:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching procedure requests',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};