import { Building2, CheckCircle, XCircle } from "lucide-react";
import { usePatchAcceptCollege, usePatchRejectCollege } from "../apis/Colleges";
import toast from "react-hot-toast";
export const CollegeCard = ({colleges}) => {
    const {acceptCollege} = usePatchAcceptCollege();
    const {rejectCollege} = usePatchRejectCollege();

  return (
    <>
      {colleges?.data?.length === 0 ? (
        <p>No inactive college found</p>
      ) : (
        colleges?.data?.map((college) => (
          <div
            key={college._id}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {college.name}
                  </h3>
                  <p className="text-sm text-gray-600">{college.address}</p>
                  <p>created at: {new Date(college.createdAt).toLocaleDateString("en-GB")}</p>
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  college.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {college.isActive ? "Active" : "Inactive"}
              </span>

             
            </div>
            {college.isActive == false && (
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              onClick={()=>acceptCollege(college._id)}
              >
                <CheckCircle className="w-4 h-4" />
                Accept
              </button>

              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              onClick={()=>rejectCollege(college._id)}
              >
                <XCircle className="w-4 h-4" />
                Reject
              </button>
            </div>
            )}
          </div>
        ))
      )}
    </>
  );
};
