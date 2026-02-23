import React, { useState, useEffect } from 'react'
import upgradesData from './upgradesData'
import fixedCosts from './fixedCosts'
import CostsTable from './components/CostsTable'
import FixedCostsTable from './components/FixedCostsTable'
import './index.css'

export default function App() {
  // track selections for upgrades (table 'a')
  const [selected, setSelected] = useState(() => {
    try {
      const saved = localStorage.getItem('selected')
      if (saved) {
        const parsed = JSON.parse(saved)
        return { a: new Set(parsed.a || []) }
      }
    } catch (e) {
      console.warn('Failed to load selected from localStorage', e)
    }
    return { a: new Set() }
  })

  // track quantities for 'multiple' type items (by index)
  const [multipleQuantities, setMultipleQuantities] = useState(() => {
    try {
      const saved = localStorage.getItem('multipleQuantities')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.warn('Failed to load multipleQuantities from localStorage', e)
    }
    const map = {}
    upgradesData.forEach((it, i) => {
      if (it.type === 'multiple') map[i] = 0
    })
    return map
  })

  // track editable fixed cost values (by index)
  const [fixedValues, setFixedValues] = useState(() => {
    try {
      const saved = localStorage.getItem('fixedValues')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.warn('Failed to load fixedValues from localStorage', e)
    }
    const map = {}
    fixedCosts.forEach((it, i) => {
      map[i] = it.price !== null && it.price !== undefined ? it.price : 0
    })
    return map
  })

  // Save selected to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selected', JSON.stringify({ a: Array.from(selected.a) }))
  }, [selected])

  // Save multipleQuantities to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('multipleQuantities', JSON.stringify(multipleQuantities))
  }, [multipleQuantities])

  // Save fixedValues to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fixedValues', JSON.stringify(fixedValues))
  }, [fixedValues])

  const tables = { a: upgradesData }

  const toggle = (tableId, index, meta = {}) => {
    setSelected((prev) => {
      const next = { a: new Set(prev.a) }

      if (meta.type === 'radio') {
        const group = meta.group
        if (group) {
          tables[tableId].forEach((it, i) => {
            if (i !== index && it.group === group && it.type === 'radio') next[tableId].delete(i)
          })
        }
        next[tableId].add(index)
        return next
      }

      if (next[tableId].has(index)) next[tableId].delete(index)
      else next[tableId].add(index)
      return next
    })
  }

  const handleFixedChange = (tableId, index, value) => {
    setFixedValues((prev) => ({ ...prev, [index]: value === null ? 0 : value }))
  }

  const handleMultipleChange = (tableId, index, quantity) => {
    setMultipleQuantities((prev) => ({ ...prev, [index]: Math.max(0, Number(quantity) || 0) }))
  }

  const upgradesTotal = upgradesData.reduce((s, it, idx) => {
    if (it.type === 'multiple') {
      const qty = multipleQuantities[idx] || 0
      if (qty > 0 && it.price !== null) return s + (it.price * qty)
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
      <div className="content">
        <div className="table-column">
          <h2>Fixed Costs</h2>
          <FixedCostsTable items={fixedCosts} values={fixedValues} onChange={handleFixedChange} tableId="b" />
        </div>
        <div className="table-column">
          <h2>Upgrades</h2>
          <CostsTable items={upgradesData} selected={selected.a} onToggle={toggle} multipleQuantities={multipleQuantities} onMultipleChange={handleMultipleChange} tableId="a" />
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
