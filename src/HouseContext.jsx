import React, { createContext, useContext } from 'react';
import { useHouses } from './useHouses';

const HouseContext = createContext();

export const HouseProvider = ({ children }) => {
  const houseData = useHouses();

  return (
    <HouseContext.Provider value={houseData}>
      {children}
    </HouseContext.Provider>
  );
};

export const useHouseContext = () => {
  return useContext(HouseContext);
};