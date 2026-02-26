import React from 'react';
import upgradesData from './upgradesData';
import CostsTable from './components/CostsTable';
import FixedCostsTable from './components/FixedCostsTable';
import { useHouseContext } from './HouseContext';
import './index.css';

export default function App() {
  const {
    houses,
    currentHouse,
    setSelections,
    createNewHouse,
    selectHouse,
    currentHouseIndex,
    addFixedCost,
    removeFixedCost,
    updateFixedCost,
  } = useHouseContext();

  if (!currentHouse) {
    return <div>Loading...</div>;
  }

  const { selected, multipleQuantities, fixedCosts } = currentHouse.selections;

  const tables = { a: upgradesData };

  const toggle = (tableId, index, meta = {}) => {
    let newSelectedAArray = Array.from(selected.a);

    if (meta.type === 'radio') {
      const group = meta.group;
      const itemIndex = newSelectedAArray.indexOf(index);

      if (itemIndex > -1) {
        newSelectedAArray.splice(itemIndex, 1);
      } else {
        if (group) {
          const groupItemsToRemove = [];
          tables[tableId].forEach((it, i) => {
            if (i !== index && it.group === group && it.type === 'radio') {
              groupItemsToRemove.push(i);
            }
          });
          newSelectedAArray = newSelectedAArray.filter(i => !groupItemsToRemove.includes(i));
        }
        newSelectedAArray.push(index);
      }
    } else {
      const itemIndex = newSelectedAArray.indexOf(index);
      if (itemIndex > -1) {
        newSelectedAArray.splice(itemIndex, 1);
      } else {
        newSelectedAArray.push(index);
      }
    }

    setSelections({ ...currentHouse.selections, selected: { a: new Set(newSelectedAArray) } });
  };

  const handleFixedChange = (index, newCost) => {
    updateFixedCost(index, newCost);
  };

  const handleMultipleChange = (tableId, index, quantity) => {
    const newMultipleQuantities = {
      ...multipleQuantities,
      [index]: Math.max(0, Number(quantity) || 0),
    };
    setSelections({ ...currentHouse.selections, multipleQuantities: newMultipleQuantities });
  };

  const upgradesTotal = upgradesData.reduce((s, it, idx) => {
    if (it.type === 'multiple') {
      const qty = multipleQuantities[idx] || 0;
      if (qty > 0 && it.price !== null) return s + it.price * qty;
    } else if (selected.a.has(idx) && it.price !== null) {
      return s + it.price;
    }
    return s;
  }, 0);

  const fixedTotal = fixedCosts.reduce((s, v) => s + (Number(v.price) || 0), 0);

  const total = upgradesTotal + fixedTotal;

  function formatCurrency(v) {
    const n = Number(v) || 0;
    return '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  return (
    <div className="app">
      <h1>House Cost</h1>
      <div className="toolbar">
        <select onChange={(e) => selectHouse(e.target.value)} value={currentHouseIndex}>
          {houses.map((house, index) => (
            <option key={index} value={index}>
              {house.name}
            </option>
          ))}
        </select>
        <button onClick={createNewHouse}>New House</button>
      </div>
      <div className="content">
        <div className="table-column">
          <h2>Fixed Costs</h2>
          <FixedCostsTable
            items={fixedCosts}
            onChange={handleFixedChange}
            onRemove={removeFixedCost}
            onAdd={addFixedCost}
          />
        </div>
        <div className="table-column">
          <h2>Upgrades</h2>
          <CostsTable
            items={upgradesData}
            selected={selected.a}
            onToggle={toggle}
            multipleQuantities={multipleQuantities}
            onMultipleChange={handleMultipleChange}
            tableId="a"
          />
        </div>
        <aside className="sidebar-total">
          <div className="total">Fixed: {formatCurrency(fixedTotal)}</div>
          <div className="total">Upgrades: {formatCurrency(upgradesTotal)}</div>
          <hr />
          <div className="total">Total</div>
          <div className="total-amount">{formatCurrency(total)}</div>
        </aside>
      </div>
    </div>
  );
}
