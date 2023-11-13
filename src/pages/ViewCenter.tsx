import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ViewCenter = () => {
  const location = useLocation();
  const centerData = location.state;

  useEffect(() => {
    if (centerData) {
      console.log('Clicked Center Data from view center:', centerData);
      // Perform other actions as needed
    }
  }, [centerData]);


  
  return (
    <div>
      {/* Your content for the target page */}
    </div>
  );
};

export default ViewCenter;