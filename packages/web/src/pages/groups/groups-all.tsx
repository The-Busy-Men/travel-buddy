import React, { useState } from 'react';
import { Group, useGroupsWithMembers } from './hooks/useGroupsWithMembers'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';

const GroupList: React.FC = () => {
  const { groups, isLoading } = useGroupsWithMembers();
  const navigate = useNavigate()

  const [filterText, setFilterText] = useState('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const filteredGroups = groups?.filter((group: Group) =>
    group.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleCardClick = (groupId: string) => {
    navigate(`/admin/groups/${groupId}`)
  }

  return (
    <>
    {isLoading ? <div className="text-center text-gray-500">Loading...</div> : undefined}
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Groups & Members</h2>
      {/* Filter input */}
      <div className="mb-4">
        <label htmlFor="filter" className="text-lg font-medium">Filter by Group Name:</label>
        <input
          type="text"
          id="filter"
          placeholder="Group Name"
          value={filterText}
          onChange={handleFilterChange}
          className="ml-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups?.map((group: Group) => (
          <div
            key={group.id}
            onClick={() => handleCardClick(group.id)}
            className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {group.name}
            </h3>
            <ul>
              {group.members.map((member) => (
                <>
                {/*Only display owners in overview*/}
                {member.role === 'owner' ? <li key={member.id} className="mb-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">
                      {member.email}
                    </span>
                    <span className="text-sm text-gray-500 italic">
                      {member.role[0].toUpperCase() + member.role.slice(1)}
                    </span>
                  </div>
                </li>: undefined}
                </>
              ))}
            </ul>
          </div>
        ))}

        {filteredGroups?.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No groups found.
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default GroupList;
