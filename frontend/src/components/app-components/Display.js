import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline'
import useAuth from '../../hooks/useAuth';



const Display = ({ myData, itemName, deleteItem }) => {
  const { auth } = useAuth()
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const divStyle = {
    height: '700px', // Adjust the height as needed
    overflowY: 'auto'
  };

  function handleMouseEnter(index){
    setHoveredIndex(index)
  }

  function handleMouseLeave() {
    setHoveredIndex(null)
  }

  function handleDelete(authId, itemId){
    deleteItem(authId, itemId)
  }

  return (
    <div style={divStyle} className='flex flex-col items-center'>
        {myData ? myData.map((item, index) => (
          <div 
          key={index} 
          className="card w-96 bg-base-100 shadow-xl mb-4"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          >
            <div className="card-body">
              <h2 className="card-title">
                {item.title}
                <div className={itemName === 'income' ? "badge badge-success text-white" : "badge badge-error text-white"}>{itemName === 'income' ? `+ ${item.amount}` : `- ${item.amount}`}</div>
              </h2>
              <p>{item.description}</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">{item.type}</div> 
                <div className="badge badge-outline">{item.date}</div>
              </div>
              {hoveredIndex === index && (
                <button onClick={() => handleDelete(auth.id, item._id)} className='absolute top-0 right-0 mt-1 mr-1 p-1 bg-gray-200 rounded-full hover:bg-gray-300'>
                  <TrashIcon className='h-6 w-6 text-gray-500'/>
                </button>
              )}
            </div>
          </div>
        )) : 
          <h1>No Data to display</h1>
        }
    </div>
  );
};

export default Display;
