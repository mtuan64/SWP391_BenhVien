const ProcedureRequest = require('../../models/ProcedureRequest');
const Employee = require('../../models/Employee');

// Get all procedure requests for a Doctor2
exports.getProcedureRequestsForDoctor2 = async (req, res) => {
  try {
    // Log req.user for debugging
    console.log('req.user:', req.user);

    // Find procedure requests where doctorId2 matches the logged-in Doctor2
    const procedureRequests = await ProcedureRequest.find({
      'services.doctorId2': req.user._id
    })
      .populate({
        path: 'profileId',
        select: 'name identityNumber'
      })
      .populate({
        path: 'doctorId',
        select: 'name'
      })
      .populate({
        path: 'services.serviceId',
        select: 'name'
      })
      .lean();

    // Log raw procedure requests for debugging
    console.log('Raw procedureRequests:', procedureRequests);

    // Transform the response to include only relevant fields
    const formattedRequests = procedureRequests.map(request => {
      // Filter services with valid doctorId2
      const validServices = request.services.filter(service => {
        if (!service.doctorId2) {
          console.warn(`Invalid service in ProcedureRequest ${request._id}: missing doctorId2`, service);
          return false;
        }
        return service.doctorId2.toString() === req.user._id.toString();
      });

      return {
        _id: request._id,
        profile: {
          name: request.profileId?.name || 'N/A',
          identityNumber: request.profileId?.identityNumber || 'N/A'
        },
        referringDoctor: {
          name: request.doctorId?.name || 'N/A'
        },
        services: validServices.map(service => ({
          serviceName: service.serviceId?.name || 'N/A'
        })),
        requestedAt: request.requestedAt || null,
        status: request.status || 'N/A'
      };
    });

    res.status(200).json({
      success: true,
      data: formattedRequests,
      message: 'Procedure requests retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching procedure requests:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching procedure requests',
      error: error.message
    });
  }
};