import { useState, useEffect } from 'react';
import upgradesData from './upgradesData';
import fixedCosts from './fixedCosts';

function initializeState() {
    const multipleQuantities = {};
    upgradesData.forEach((it, i) => {
      if (it.type === 'multiple') multipleQuantities[i] = 0;
    });
  
    const fixedValues = {};
    fixedCosts.forEach((it, i) => {
      fixedValues[i] = it.price !== null && it.price !== undefined ? it.price : 0;
    });

    return {
        selected: { a: new Set() },
        multipleQuantities,
        fixedValues,
    }
  }

export function useHouses() {
  const [houses, setHouses] = useState(() => {
    try {
      const saved = localStorage.getItem('houses');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length) {
          // Deserialise sets
          return parsed.map(p => ({...p, selections: {...p.selections, selected: { a: new Set(p.selections.selected.a) }}}));
        }
      }
    } catch (e) {
      console.warn('Failed to load houses from localStorage', e);
    }
    return [{ name: 'New House', selections: initializeState() }];
  });

  const [currentHouseIndex, setCurrentHouseIndex] = useState(0);

  const currentHouse = houses[currentHouseIndex];
  const setSelections = (selections) => {
    const newHouses = [...houses];
    newHouses[currentHouseIndex] = {
      ...newHouses[currentHouseIndex],
      selections,
    };
    setHouses(newHouses);
  }

  useEffect(() => {
    // Serialise sets
    const serialisedHouses = houses.map(p => ({...p, selections: {...p.selections, selected: { a: Array.from(p.selections.selected.a) }}}));
    localStorage.setItem('houses', JSON.stringify(serialisedHouses));
  }, [houses]);

  const createNewHouse = () => {
    const newHouse = {
      name: `House ${houses.length + 1}`,
      selections: initializeState(),
    };
    setHouses([...houses, newHouse]);
    setCurrentHouseIndex(houses.length);
  };

  const selectHouse = (index) => {
    setCurrentHouseIndex(index);
  };

  return {
    houses,
    currentHouse,
    setSelections,
    createNewHouse,
    selectHouse,
    currentHouseIndex,
  };
}
