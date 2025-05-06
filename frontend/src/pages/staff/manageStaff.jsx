import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditStaffModal from './editStaff';
import DeleteStaffModal from './deleteStaff';

const ManageStaff = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [searchName, setSearchName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(10); 

  // State for managing modals
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);

  useEffect(() => {
    fetchStaffMembers();
  }, []);

  useEffect(() => {
    filterMembers();
  }, [searchTerm,searchName, filterRole, staffMembers]);

  const fetchStaffMembers = () => {
    axios.get('http://localhost:5000/api/v1/staff')
      .then(response => {
        setStaffMembers(response.data.staffs);
        setFilteredMembers(response.data.staffs);
      })
      .catch(error => {
        console.error('Failed to fetch staff:', error);
      });
  };

  const filterMembers = () => {
    
    let tempMembers = staffMembers.filter(member =>
      member.JobRole.includes(filterRole) &&
      member.staffId.toString().includes(searchTerm)&&
      //member.fName+" "+member.lName.includes(searchName)
      `${member.fName} ${member.lName}`.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredMembers(tempMembers);
  };

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const openEditModal = (staff) => {
    setCurrentStaff(staff);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const openDeleteModal = (staff) => {
    setCurrentStaff(staff);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleUpdate = (staffId, updatedData) => {
    axios.put(`http://localhost:5000/api/v1/staff/${staffId}`, updatedData)
      .then(response => {
        fetchStaffMembers(); // Refresh data
        closeEditModal();
      })
      .catch(error => {
        console.error('Error updating staff:', error);
      });
  };
/*
  const handleDelete = (staffId) => {
    axios.delete(`http://localhost:5000/api/v1/staff/${staffId}`)
      .then(response => {
        fetchStaffMembers(); // Refresh data
        closeDeleteModal();
      })
      .catch(error => {
        console.error('Error deleting staff:', error);
      });
  };
  */

  const handleDelete = (staffId) => {
    axios.put(`http://localhost:5000/api/v1/staff/${staffId}`, { Status: 'Deactive' })
    .then(response => {
        fetchStaffMembers(); // Refresh data
        closeDeleteModal();
      })
    .catch(error => {
        console.error('Error deactivating staff:', error);
      });
  };

 


  return (
    <div className="container mx-auto px-4" style={{ marginTop: '20px' }}>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by Staff ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          placeholder="Search by Staff Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded"
        />

        <select
          onChange={(e) => setFilterRole(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded ml-2"
        >
          <option value="">All Roles</option>
          <option value="systemadmin">System Admin</option>
          <option value="medicalsecretary">Medical Secretary</option>
          <option value="staffmanager">Staff Manager</option>
          <option value="appointmentmanager">Appointment Manager</option>
          <option value="inventorymanager">Inventory Manager</option>
          <option value="productmanager">Product Manager</option> 
          <option value="servicehandler">Service Handler</option> 
        </select>
      </div>
      <table className="min-w-full bg-white shadow overflow-hidden rounded-lg">
        <thead>
          <tr className="bg-cyan-500 text-white">
            <th className="py-2 px-4">Staff Image</th>
            <th className="py-2 px-4">Staff ID</th>
            <th className="py-2 px-4">User ID</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Phone</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentMembers.map((member) => (
            <tr key={member.staffId}>
               <td className="text-center">
  <div className="inline-block rounded-full overflow-hidden w-10 h-10">
    {member.Image ? (
      <img
        src={member.Image}
        alt="Profile Pic"
        className="object-cover w-full h-full"
      />
    ) : (
      <img
        src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" 
        alt="Default Profile Pic"
        className="object-cover w-full h-full"
      />
    )}
  </div>
</td>
              <td className="text-center">{member.staffId}</td>
              <td className="text-center">{member.userId}</td>
              <td className="text-center">{`${member.fName} ${member.lName}`}</td>
              <td className="text-center">{member.Status}</td>
              <td className="text-center">{member.JobRole}</td>
              <td className="text-center">{member.phone}</td>
              <td className="text-center">
                <button onClick={() => openEditModal(member)} className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded mr-3">
                  Edit
                </button>
                <button onClick={() => openDeleteModal(member)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <div className="inline-flex">
          {Array.from({ length: Math.ceil(filteredMembers.length / membersPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 border ${currentPage === i + 1 ? 'bg-cyan-500 text-white' : 'bg-white text-cyan-500'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      {editModalOpen && (
        <EditStaffModal
          isOpen={editModalOpen}
          handleClose={closeEditModal}
          staffMember={currentStaff}
          handleUpdate={handleUpdate}
        />
      )}
      {deleteModalOpen && (
        <DeleteStaffModal
          isOpen={deleteModalOpen}
          handleClose={closeDeleteModal}
          staffId={currentStaff.staffId}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ManageStaff;

