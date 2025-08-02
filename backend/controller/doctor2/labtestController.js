const mongoose = require('mongoose');
const ProcedureResult = require('../../models/ProcedureResult');
const ProcedureRequest = require('../../models/ProcedureRequest');
const testParameters = require('../../config/testParameters');

exports.getTestParameters = async (req, res) => {
    try {
        const { testType } = req.params;
        if (!testParameters[testType]) {
            return res.status(400).json({ success: false, message: 'Invalid test type' });
        }
        res.status(200).json({ success: true, data: testParameters[testType] });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error: ' + error.message });
    }
};

exports.submitTestResult = async (req, res) => {
    try {
        const { procedureRequestId, serviceId, testType, resultDetails, resultNote } = req.body;

        // Validate procedureRequestId
        const procedureRequest = await ProcedureRequest.findById(procedureRequestId);
        if (!procedureRequest) {
            return res.status(404).json({ success: false, message: 'Procedure request not found' });
        }

        // Validate serviceId and testType
        const service = procedureRequest.services.find(s => s._id.toString() === serviceId);
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found in procedure request' });
        }
        if (service.testType !== testType) {
            return res.status(400).json({ success: false, message: 'Test type does not match service' });
        }

        // Validate testType
        if (!testParameters[testType]) {
            return res.status(400).json({ success: false, message: 'Invalid test type' });
        }

        // Validate resultDetails against test parameters
        const expectedParams = testParameters[testType].map(param => param.name);
        const submittedParams = resultDetails.map(detail => detail.name);
        if (!expectedParams.every(param => submittedParams.includes(param))) {
            return res.status(400).json({ success: false, message: 'Missing required parameters' });
        }

        // Create or update procedure result
        let procedureResult = await ProcedureResult.findOne({ procedureRequestId, serviceId });
        if (procedureResult) {
            procedureResult.testType = testType;
            procedureResult.resultDetails = resultDetails;
            procedureResult.resultNote = resultNote;
        } else {
            procedureResult = new ProcedureResult({
                procedureRequestId,
                serviceId,
                testType,
                resultDetails,
                resultNote
            });
        }

        // Update service status in ProcedureRequest to Completed
        service.status = 'Completed';

        // Check if all services are Completed
        const allServicesCompleted = procedureRequest.services.every(s => s.status === 'Completed');
        if (allServicesCompleted) {
            procedureRequest.status = 'Completed';
        }

        await procedureRequest.save();
        await procedureResult.save();

        res.status(200).json({ success: true, data: procedureResult });
    } catch (error) {
        console.error('Error submitting test result:', error);
        res.status(500).json({ success: false, message: 'Server error: ' + error.message });
    }
};

exports.getAllProcedureResultByDoctorId2 = async (req, res) => {
    try {
        const { doctorId2 } = req.params;

        // Validate doctorId2
        if (!mongoose.Types.ObjectId.isValid(doctorId2)) {
            return res.status(400).json({ success: false, message: 'Invalid doctorId2' });
        }

        // Find all ProcedureRequest with doctorId2 in services
        const procedureRequests = await ProcedureRequest.find({
            'services.doctorId2': new mongoose.Types.ObjectId(doctorId2)
        }).select('_id services medicalRecordId profileId doctorId');

        // Get list of procedureRequestIds and relevant services
        const procedureResults = await ProcedureResult.find({
            procedureRequestId: { $in: procedureRequests.map(pr => pr._id) }
        })
            .populate({
                path: 'procedureRequestId',
                select: 'medicalRecordId profileId doctorId services',
                populate: [
                    { path: 'profileId', select: 'name identityNumber' },
                    { path: 'doctorId', select: 'name' }
                ]
            })
            .lean();

        if (!procedureResults.length) {
            return res.status(404).json({ success: false, message: 'No procedure results found for this doctor' });
        }

        // Format response to include service status
        const formattedResults = procedureResults.map(result => {
            const procedureRequest = procedureRequests.find(pr => pr._id.toString() === result.procedureRequestId.toString());
            const service = procedureRequest?.services.find(s => s._id.toString() === result.serviceId.toString());
            return {
                ...result,
                status: service?.status || 'N/A'
            };
        });

        res.status(200).json({ success: true, data: formattedResults });
    } catch (error) {
        console.error('Error fetching procedure results:', error);
        res.status(500).json({ success: false, message: 'Server error: ' + error.message });
    }
};