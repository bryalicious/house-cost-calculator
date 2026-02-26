import React from 'react'

// Generate a light, consistent background color from a string
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

function formatCurrency(v) {
  if (v === null || v === undefined) return 'TBD'
  const n = Number(v) || 0
  return '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function CostsTable({ items, selected, onToggle, multipleQuantities, onMultipleChange, tableId }) {
  // Group items by category
  const grouped = items.reduce((acc, item, index) => {
    const cat = item.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push({ ...item, index })
    return acc
  }, {})

  const categories = Object.keys(grouped).sort()

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
        {categories.map((cat) => (
          <React.Fragment key={cat}>
            <tr className="category-row">
              <td colSpan="3">{cat}</td>
            </tr>
            {(() => {
              const rows = []
              const list = grouped[cat]

              // collect radio groups and standalone items
              const groupsMap = {}
              const groupsOrder = []
              const singles = []

              list.forEach((it) => {
                if (it.type === 'radio' && it.group) {
                  if (!groupsMap[it.group]) {
                    groupsMap[it.group] = []
                    groupsOrder.push(it.group)
                  }
                  groupsMap[it.group].push(it)
                } else {
                  singles.push(it)
                }
              })

              // render each radio group contiguously
              groupsOrder.forEach((grp) => {
                const run = groupsMap[grp]
                const bg = colorFromString(grp)
                run.forEach((opt, idxInRun) => {
                  const isFirst = idxInRun === 0
                  const isLast = idxInRun === run.length - 1
                  rows.push(
                    <tr
                      key={`${tableId}-${opt.index}`}
                      className={`radio-group-item ${isFirst ? 'first' : ''} ${isLast ? 'last' : ''}`}
                      style={{ backgroundColor: bg }}
                      title={grp}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={selected.has(opt.index)}
                          onChange={() => onToggle(tableId, opt.index, { type: 'radio', group: grp })}
                          disabled={opt.price === null}
                        />
                      </td>
                      <td>{opt.item}</td>
                      <td>{opt.price !== null ? formatCurrency(opt.price) : 'N/A'}</td>
                    </tr>
                  )
                })
              })

              // then render standalone items
              singles.forEach((current) => {
                rows.push(
                  <tr key={`${tableId}-${current.index}`}>
                    <td>
                      {current.type === 'multiple' ? (
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={multipleQuantities?.[current.index] ?? 0}
                          onChange={(e) => onMultipleChange(tableId, current.index, e.target.value)}
                          disabled={current.price === null}
                          className="qty-input"
                        />
                      ) : current.type === 'radio' ? (
                        <input
                          type="checkbox"
                          checked={selected.has(current.index)}
                          onChange={() => onToggle(tableId, current.index, { type: 'radio', group: current.group })}
                          disabled={current.price === null}
                        />
                      ) : (
                        <input
                          type="checkbox"
                          checked={selected.has(current.index)}
                          onChange={() => onToggle(tableId, current.index, { type: current.type })}
                          disabled={current.price === null}
                        />
                      )}
                    </td>
                    <td>{current.item}</td>
                    <td>{current.price !== null ? formatCurrency(current.price) : 'N/A'}</td>
                  </tr>
                )
              })

              return rows
            })()}
          </React.Fragment>
        ))}
      </tbody>
    </table>
    </div>
  )
}
