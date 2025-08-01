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
            procedureResult.status = 'completed';
        } else {
            procedureResult = new ProcedureResult({
                procedureRequestId,
                serviceId,
                testType,
                resultDetails,
                resultNote,
                status: 'completed'
            });
        }

        // Update service status in ProcedureRequest
        service.status = 'Completed';
        await procedureRequest.save();
        await procedureResult.save();

        res.status(200).json({ success: true, data: procedureResult });
    } catch (error) {
        console.error('Error submitting test result:', error);
        res.status(500).json({ success: false, message: 'Server error: ' + error.message });
    }
};