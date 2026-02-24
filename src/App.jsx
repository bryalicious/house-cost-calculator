import React from 'react'
import upgradesData from './upgradesData'
import fixedCosts from './fixedCosts'
import CostsTable from './components/CostsTable'
import FixedCostsTable from './components/FixedCostsTable'
import { useHouseContext } from './HouseContext'
import './index.css'

export default function App() {
  const {
    houses,
    currentHouse,
    setSelections,
    createNewHouse,
    selectHouse,
    currentHouseIndex,
  } = useHouseContext()

  const { selected, multipleQuantities, fixedValues } = currentHouse.selections

  const tables = { a: upgradesData }

  const toggle = (tableId, index, meta = {}) => {
    const newSelected = { a: new Set(selected.a) }

    if (meta.type === 'radio') {
      const group = meta.group
      if (group) {
        tables[tableId].forEach((it, i) => {
          if (i !== index && it.group === group && it.type === 'radio')
            newSelected[tableId].delete(i)
        })
      }
      newSelected[tableId].add(index)
    } else {
      if (newSelected[tableId].has(index)) newSelected[tableId].delete(index)
      else newSelected[tableId].add(index)
    }

    setSelections({ ...currentHouse.selections, selected: newSelected })
  }

  const handleFixedChange = (tableId, index, value) => {
    const newFixedValues = { ...fixedValues, [index]: value === null ? 0 : value }
    setSelections({ ...currentHouse.selections, fixedValues: newFixedValues })
  }

  const handleMultipleChange = (tableId, index, quantity) => {
    const newMultipleQuantities = {
      ...multipleQuantities,
      [index]: Math.max(0, Number(quantity) || 0),
    }
    setSelections({ ...currentHouse.selections, multipleQuantities: newMultipleQuantities })
  }

  const upgradesTotal = upgradesData.reduce((s, it, idx) => {
    if (it.type === 'multiple') {
      const qty = multipleQuantities[idx] || 0
      if (qty > 0 && it.price !== null) return s + it.price * qty
    } else if (selected.a.has(idx) && it.price !== null) {
      return s + it.price
    }
    return s
  }, 0)

  const fixedTotal = Object.values(fixedValues).reduce((s, v) => s + (Number(v) || 0), 0)

  const total = upgradesTotal + fixedTotal

  function formatCurrency(v) {
    const n = Number(v) || 0
    return '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
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
            values={fixedValues}
            onChange={handleFixedChange}
            tableId="b"
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
  )
}
