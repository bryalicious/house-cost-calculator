import React from 'react';

export default function FixedCostsTable({ items, onChange, onRemove, onAdd }) {
  const handleChange = (index, field, value) => {
    const newPrice = field === 'price' ? parseFloat(value) || 0 : value;
    const newItem = { ...items[index], [field]: newPrice };
    onChange(index, newItem);
  };

  return (
    <div className="table-scroll">
      <table className="items-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Cost</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={item.item}
                  onChange={(e) => handleChange(index, 'item', e.target.value)}
                  className="item-input"
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  value={item.price ?? ''}
                  onChange={(e) => handleChange(index, 'price', e.target.value)}
                  className="cost-input"
                />
              </td>
              <td>
                <button onClick={() => onRemove(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onAdd}>Add Cost</button>
    </div>
  );
}
