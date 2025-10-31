// AdminDashboard.js
import React, { useState, useEffect, use } from 'react';
import { getAllUsers, getUserById } from '../../api/admin/admin';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();

        // Ensure all users have status in lowercase
        const usersWithStatus = data.map(user => ({
          ...user,
          status: user.status ? user.status.toLowerCase() : 'pending'
        }));

        setUsers(usersWithStatus);
        console.log('Fetched users:', usersWithStatus);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUserById = async(id) => {
      try {   
        const response = await getUserById(id);
        return response.data;
        
      } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
      }
    }
    fetchUserById();
  }, []);

  // Approve a user
  const handleApprove = (userId) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: 'approved' } : user
    ));
  };

  // Reject a user
  const handleReject = (userId) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: 'rejected' } : user
    ));
  };

  // Filtered users based on search and status
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === 'all' || user.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  // Count users by status
  const getStatusCount = (status) => {
    return users.filter(user => user.status === status).length;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          User Management Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card title="Total Users" count={users.length} color="blue" />
          <Card title="Pending Approval" count={getStatusCount('pending')} color="yellow" />
          <Card title="Approved" count={getStatusCount('approved')} color="green" />
          <Card title="Rejected" count={getStatusCount('rejected')} color="red" />
        </div>
      </header>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <UserRow
                    key={user.id}
                    user={user}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-gray-500 italic">
                    No users found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Status Card Component
const Card = ({ title, count, color }) => (
  <div className={`bg-white p-6 rounded-lg shadow-sm border-l-4 border-${color}-500`}>
    <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
    <span className="text-3xl font-bold text-gray-900">{count}</span>
  </div>
);

// User Row Component
const UserRow = ({ user, onApprove, onReject }) => {
  const getStatusBadge = (status) => {
    const classes = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return (
      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${classes[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">{user.avatar}</span>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
      <td className="px-6 py-4 whitespace-nowrap">{new Date(user.registrationDate).toLocaleDateString()}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
          {user.role}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(user.status)}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div className="flex items-center space-x-2">
          {user.status === 'pending' ? (
            <>
              <button
                onClick={() => onApprove(user.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => onReject(user.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
              >
                Reject
              </button>
            </>
          ) : (
            <span className="text-gray-500 text-sm italic">Action taken</span>
          )}
        </div>
      </td>
    </tr>
  );
};

export default AdminDashboard;
