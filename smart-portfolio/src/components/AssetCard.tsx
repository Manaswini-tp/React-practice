import React from 'react';

interface AssetCardProps {
  name: string;
  symbol: string;
  value: number;
  change: number;
  onRemove: (symbol: string) => void;
}

const AssetCard: React.FC<AssetCardProps> = ({
  name,
  symbol,
  value,
  change,
  onRemove
}) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
      <span>{name} ({symbol})</span>
      <span> | ${value}</span>
      <span style={{ color: change >= 0 ? 'green' : 'red' }}>
        {' '}{change > 0 ? '+' : ''}{change}%
      </span>
      <button onClick={() => onRemove(symbol)}>Remove</button>
    </div>
  );
};

export default AssetCard;
