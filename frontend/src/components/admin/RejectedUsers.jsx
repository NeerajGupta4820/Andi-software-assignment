import React from 'react';
import { 
  useGetRejectedUsersQuery,
  useUpdateUserStatusMutation
} from '../../redux/features/user/userApi';

const RejectedUsers = () => {
  const { data, isLoading, error, refetch } = useGetRejectedUsersQuery();
  const [updateStatus] = useUpdateUserStatusMutation();

  const rejectedUsers = Array.isArray(data) ? data : data?.data || [];

  const handleApprove = async (userId) => {
    if (!window.confirm('Are you sure you want to approve this user?')) return;
    
    try {
      await updateStatus({ userId, status: 'approved' }).unwrap();
      refetch();
    } catch (error) {
      console.error('Approval failed:', error);
      alert('Failed to approve user. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading rejected users...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error loading rejected users: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Rejected Users</h1>
      
      {rejectedUsers.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">No rejected users.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Rejection Reason</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rejectedUsers.map(user => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.rejectionReason || 'No reason provided'}</td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => handleApprove(user._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RejectedUsers;
