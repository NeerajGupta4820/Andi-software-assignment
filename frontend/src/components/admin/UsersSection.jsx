import React from 'react';
import { 
  useGetAllUsersQuery, 
  useUpdateUserStatusMutation 
} from '../../redux/features/user/userApi';

const UsersSection = () => {
  const { data, isLoading, refetch, error } = useGetAllUsersQuery();
  console.log(data);
  
  const [updateStatus] = useUpdateUserStatusMutation();

  const handleStatusChange = async (userId, newStatus) => {
    const confirmMessage = newStatus === 'approved' 
      ? 'Are you sure you want to approve this user?'
      : 'Are you sure you want to reject this user?';
    
    if (!window.confirm(confirmMessage)) return;

    try {
      let updateData = { status: newStatus };
      
      if (newStatus === 'rejected') {
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
    return <div className="text-center py-8">Loading users...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error loading users: {error.message}</div>;
  }

  const users = Array.isArray(data) ? data : data?.data || [];

  if (!users.length) {
    return <div className="text-center py-8">No users found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User Management</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'approved' ? 'bg-green-100 text-green-800' :
                    user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-4 space-x-2">
                  {user.status !== 'approved' && (
                    <button 
                      onClick={() => handleStatusChange(user._id, 'approved')}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      Approve
                    </button>
                  )}
                  {user.status !== 'rejected' && (
                    <button 
                      onClick={() => handleStatusChange(user._id, 'rejected')}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersSection;