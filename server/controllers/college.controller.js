import { College } from '../models/College.model.js';

export const getActiveColleges = async (req, res) => {
  try {
    const activeColleges = await College.aggregate([
      {
        $match: {
          isActive: true,
          isRejected: false
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          AISHEcode: 1,
          collegeCode: 1,
          InstitutionType: 1,
          address: 1,
          isActive: 1,
          isRejected: 1,
          createdAt: 1,
          updatedAt: 1
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);

    return res.status(200).json({
      success: true,
      count: activeColleges.length,
      data: activeColleges,
      message: 'Active colleges fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching active colleges:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch active colleges',
      error: error.message
    });
  }
};


export const getInactiveColleges = async (req, res) => {
  try {
    const inactiveColleges = await College.aggregate([
      {
        $match: {
          isActive: false,
          isRejected: false
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          AISHEcode: 1,
          collegeCode: 1,
          InstitutionType: 1,
          address: 1,
          isActive: 1,
          isRejected: 1,
          createdAt: 1,
          updatedAt: 1
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);

    return res.status(200).json({
      success: true,
      count: inactiveColleges.length,
      data: inactiveColleges,
      message: 'Inactive/Pending colleges fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching inactive colleges:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch inactive colleges',
      error: error.message
    });
  }
};

export const getRejectedColleges = async (req, res) => {
  try {
    const rejectedColleges = await College.aggregate([
      {
        $match: {
          isRejected: true
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          AISHEcode: 1,
          collegeCode: 1,
          InstitutionType: 1,
          address: 1,
          isActive: 1,
          isRejected: 1,
          createdAt: 1,
          updatedAt: 1,
          daysSinceApplication: {
            $divide: [
              { $subtract: [new Date(), '$createdAt'] },
              1000 * 60 * 60 * 24
            ]
          }
        }
      },
      {
        $sort: { updatedAt: -1 }
      }
    ]);

    // Get aggregated statistics
    const stats = await College.aggregate([
      {
        $facet: {
          byInstitutionType: [
            { $match: { isRejected: true } },
            {
              $group: {
                _id: '$InstitutionType',
                count: { $sum: 1 }
              }
            }
          ],
          totalRejected: [
            { $match: { isRejected: true } },
            { $count: 'total' }
          ]
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      count: rejectedColleges.length,
      data: rejectedColleges,
      statistics: {
        total: stats[0].totalRejected[0]?.total || 0,
        byInstitutionType: stats[0].byInstitutionType
      },
      message: 'Rejected colleges fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching rejected colleges:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch rejected colleges',
      error: error.message
    });
  }
};


export const acceptCollege = async (req, res) => {
  try {
    const { collegeId } = req.params;

    const college = await College.findByIdAndUpdate(
      collegeId,
      { 
        isActive: true,
        isRejected: false
      },
      { new: true, runValidators: true }
    );

    if (!college) {
      return res.status(404).json({
        success: false,
        message: 'College not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: college,
      message: 'College accepted successfully'
    });
  } catch (error) {
    console.error('Error accepting college:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to accept college',
      error: error.message
    });
  }
};

// Controller to REJECT a college (set isRejected: true, isActive: false)
export const rejectCollege = async (req, res) => {
  try {
    const { collegeId } = req.params;

    const college = await College.findByIdAndUpdate(
      collegeId,
      { 
        isActive: false,
        isRejected: true
      },
      { new: true, runValidators: true }
    );

    if (!college) {
      return res.status(404).json({
        success: false,
        message: 'College not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: college,
      message: 'College rejected successfully'
    });
  } catch (error) {
    console.error('Error rejecting college:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to reject college',
      error: error.message
    });
  }
};

// Controller to DEACTIVATE a college (set isActive: false, keep isRejected: false)
export const deactivateCollege = async (req, res) => {
  try {
    const { collegeId } = req.params;

    const college = await College.findByIdAndUpdate(
      collegeId,
      { 
        isActive: false,
        isRejected: false
      },
      { new: true, runValidators: true }
    );

    if (!college) {
      return res.status(404).json({
        success: false,
        message: 'College not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: college,
      message: 'College deactivated successfully'
    });
  } catch (error) {
    console.error('Error deactivating college:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to deactivate college',
      error: error.message
    });
  }
};
