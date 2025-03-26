import React from 'react';
import { 
  useGetPendingUsersQuery,
  useUpdateUserStatusMutation 
} from '../../redux/features/user/userApi';

const PendingUsers = () => {
  const { data, isLoading, refetch, error } = useGetPendingUsersQuery();
  const [updateStatus] = useUpdateUserStatusMutation();

  const handleStatusChange = async (userId, status) => {
    const confirmMessage = status === 'approved' 
      ? 'Are you sure you want to approve this user?'
      : 'Are you sure you want to reject this user?';
    
    if (!window.confirm(confirmMessage)) return;

    try {
      const updateData = { status };
      if (status === 'rejected') {
        const reason = prompt('Please enter the rejection reason:');
        if (!reason) return;
        updateData.reason = reason;
      }

      await updateStatus({ userId, ...updateData }).unwrap();
      refetch();
    } catch (error) {
      console.error('Status update failed:', error);
      alert(`Failed to update user status: ${error.message || 'Please try again.'}`);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading pending users...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error loading pending users: {error.message}</div>;
  }

  const pendingUsers = Array.isArray(data) ? data : data?.data || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Pending Approvals</h1>
      
      {pendingUsers.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">No pending user approvals.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pendingUsers.map(user => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 space-x-2">
                    <button 
                      onClick={() => handleStatusChange(user._id, 'approved')}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleStatusChange(user._id, 'rejected')}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Reject
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

export default PendingUsers;