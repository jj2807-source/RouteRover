import React, { createContext, useState } from 'react';

export const FindSchoolContext = createContext();

export const FindSchoolProvider = ({ children }) => {
  const [schoolSearchData, setSchoolSearchData] = useState({
    age: '',
    gender: '',
    disability: '',
    location: '',
    dayScholar: true, // default value
  });

  return (
    <FindSchoolContext.Provider value={{ schoolSearchData, setSchoolSearchData }}>
      {children}
    </FindSchoolContext.Provider>
  );
};
