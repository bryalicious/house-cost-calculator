import React, { useState } from 'react';
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
    clearSelections,
    duplicateHouse,
    renameHouse,
    importHouses,
  } = useHouseContext();
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [importJson, setImportJson] = useState('');
  const [importError, setImportError] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);

  if (!currentHouse) {
    return <div>Loading...</div>;
  }

  const { selected, multipleQuantities, fixedCosts } = currentHouse.selections;

  const tables = { a: upgradesData };

  const toggle = (tableId, index, meta = {}) => {
    let newSelectedAArray = Array.from(selected.a);

    const item = tables[tableId][index];
    const isSelecting = !selected.a.has(index);

    if (isSelecting) {
      // Check if this item excludes others
      if (item.excludes) {
        item.excludes.forEach(excludedItemName => {
          const excludedIndex = tables[tableId].findIndex(it => it.item === excludedItemName);
          if (excludedIndex > -1) {
            const idx = newSelectedAArray.indexOf(excludedIndex);
            if (idx > -1) {
              newSelectedAArray.splice(idx, 1);
            }
          }
        });
      }
    }

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

  const handleExport = async () => {
    const serialisedHouses = houses.map((p) => ({
      name: p.name,
      selections: {
        ...p.selections,
        selected: { a: Array.from(p.selections.selected.a) },
        multipleQuantities: { ...p.selections.multipleQuantities },
        fixedCosts: p.selections.fixedCosts.map((cost) => ({ ...cost })),
      },
    }));

    const text = JSON.stringify(serialisedHouses, null, 2);
    try {
      await navigator.clipboard.writeText(text);
      setImportError('Copied houses state to clipboard.');
    } catch (err) {
      setImportError('Unable to copy to clipboard. Please use manual copy.');
    }
  };

  const handleImportOpen = () => {
    setImportJson('');
    setImportError('');
    setIsImportOpen(true);
  };

  const handleImportClose = () => {
    setIsImportOpen(false);
    setImportError('');
  };

  const handleImportSubmit = () => {
    try {
      const parsed = JSON.parse(importJson);
      const importedHouses = Array.isArray(parsed)
        ? parsed
        : parsed?.houses || parsed?.Houses || null;
      if (!Array.isArray(importedHouses)) {
        throw new Error('Paste a valid houses array or object containing houses.');
      }
      importHouses(importedHouses);
      setIsImportOpen(false);
      setImportJson('');
      setImportError('');
    } catch (err) {
      setImportError(err.message || 'Invalid JSON.');
    }
  };

  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditingName(false);
    }
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
      {isEditingName ? (
        <input
          autoFocus
          className="house-name-input"
          type="text"
          value={currentHouse.name}
          onChange={(e) => renameHouse(e.target.value)}
          onKeyDown={handleNameKeyDown}
          onBlur={() => setIsEditingName(false)}
        />
      ) : (
        <h1 className="editable-heading" onClick={() => setIsEditingName(true)}>
          {currentHouse.name}
        </h1>
      )}
      <div className="toolbar">
        <select onChange={(e) => selectHouse(e.target.value)} value={currentHouseIndex}>
          {houses.map((house, index) => (
            <option key={index} value={index}>
              {house.name}
            </option>
          ))}
        </select>
        <button onClick={createNewHouse}>New House</button>
        <button onClick={duplicateHouse}>Duplicate House</button>
        <button onClick={clearSelections}>Clear Selections</button>
        <button onClick={handleExport}>Export</button>
        <button onClick={handleImportOpen}>Import</button>
      </div>
      {isImportOpen && (
        <div className="modal-backdrop" onClick={handleImportClose}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Import Houses</h2>
            <p>Paste exported houses JSON and click OK to add the imported houses.</p>
            <textarea
              value={importJson}
              onChange={(e) => setImportJson(e.target.value)}
              placeholder="Paste houses JSON here"
            />
            {importError && <div className="error-message">{importError}</div>}
            <div className="modal-actions">
              <button onClick={handleImportClose}>Cancel</button>
              <button onClick={handleImportSubmit}>OK</button>
            </div>
          </div>
        </div>
      )}
      <div className="content">
        <div className="table-column">
          <h2>Other Costs</h2>
          <FixedCostsTable
            items={fixedCosts}
            onChange={handleFixedChange}
            onRemove={removeFixedCost}
            onAdd={addFixedCost}
          />
        </div>
        <div className="table-column">
          <h2>Upgrade costs</h2>
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
