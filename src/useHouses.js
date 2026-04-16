import { useState, useEffect } from 'react';
import upgradesData from './upgradesData';
import initialFixedCosts from './fixedCosts';

function initializeState() {
    const multipleQuantities = {};
    upgradesData.forEach((it, i) => {
      if (it.type === 'multiple') multipleQuantities[i] = 0;
    });
  
    return {
        selected: { a: new Set() },
        multipleQuantities,
        fixedCosts: initialFixedCosts,
    }
  }

export function useHouses() {
  const [houses, setHouses] = useState(() => {
    try {
      const saved = localStorage.getItem('houses');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length) {
          // Deserialise sets and ensure fixedCosts exists
          return parsed.map(p => {
            const selections = { ...initializeState(), ...p.selections };
            selections.selected = { a: new Set(selections.selected.a) };
            return { ...p, selections };
          });
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

  const addFixedCost = () => {
    const newFixedCosts = [...currentHouse.selections.fixedCosts, { item: 'New Cost', price: 0 }];
    setSelections({ ...currentHouse.selections, fixedCosts: newFixedCosts });
  };

  const removeFixedCost = (index) => {
    const newFixedCosts = currentHouse.selections.fixedCosts.filter((_, i) => i !== index);
    setSelections({ ...currentHouse.selections, fixedCosts: newFixedCosts });
  };

  const updateFixedCost = (index, newCost) => {
    const newFixedCosts = [...currentHouse.selections.fixedCosts];
    newFixedCosts[index] = newCost;
    setSelections({ ...currentHouse.selections, fixedCosts: newFixedCosts });
  };

  const clearSelections = () => {
    setSelections(initializeState());
  };

  const duplicateHouse = () => {
    const copiedSelections = {
      selected: { a: new Set(Array.from(currentHouse.selections.selected.a)) },
      multipleQuantities: { ...currentHouse.selections.multipleQuantities },
      fixedCosts: currentHouse.selections.fixedCosts.map(cost => ({ ...cost })),
    };

    const duplicate = {
      name: `${currentHouse.name} Copy`,
      selections: copiedSelections,
    };

    setHouses([...houses, duplicate]);
    setCurrentHouseIndex(houses.length);
  };

  const normalizeSelections = (rawSelections) => {
    const base = initializeState();
    const selections = {
      ...base,
      ...rawSelections,
      multipleQuantities: { ...base.multipleQuantities, ...rawSelections?.multipleQuantities },
      fixedCosts: Array.isArray(rawSelections?.fixedCosts) ? rawSelections.fixedCosts : base.fixedCosts,
    };
    selections.selected = {
      a: new Set(Array.isArray(rawSelections?.selected?.a) ? rawSelections.selected.a : []),
    };
    return selections;
  };

  const importHouses = (imported) => {
    const normalized = imported.map((house, idx) => ({
      name: house.name || `House ${houses.length + idx + 1}`,
      selections: normalizeSelections(house.selections || {}),
    }));
    setHouses((prev) => [...prev, ...normalized]);
  };

  const renameHouse = (name) => {
    const newHouses = [...houses];
    newHouses[currentHouseIndex] = {
      ...newHouses[currentHouseIndex],
      name,
    };
    setHouses(newHouses);
  };

  return {
    houses,
    currentHouse,
    setSelections,
    createNewHouse,
    selectHouse,
    currentHouseIndex,
    addFixedCost,
    removeFixedCost,
    updateFixedCost,
    clearSelections,
    duplicateHouse,
    renameHouse,
    importHouses,
  };
}
