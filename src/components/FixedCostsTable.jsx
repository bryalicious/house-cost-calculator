import React from 'react'

function colorFromString(str) {
  if (!str) return undefined
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash
  }
  const hue = Math.abs(hash) % 360
  return `hsla(${hue}, 60%, 92%, 0.9)`
}

export default function FixedCostsTable({ items, values, onChange, tableId }) {
  const handleChange = (idx, raw) => {
    const v = raw === '' ? null : Number(raw)
    onChange(tableId, idx, v)
  }

  return (
    <div className="table-scroll">
      <table className="items-table">
        <thead>
        <tr>
          <th></th>
          <th>Item</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={`${tableId}-${index}`}>
            <td></td>
            <td>{item.item}</td>
            <td>
              <input
                type="number"
                step="0.01"
                value={values[index] === null ? '' : values[index] ?? ''}
                onChange={(e) => handleChange(index, e.target.value)}
                className="cost-input"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}
