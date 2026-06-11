import React from 'react';
import AssetCard from './AssetCard';

interface Asset {
  name: string;
  symbol: string;
  value: number;
  change: number;
}

interface AssetListProps {
  assets: Asset[];
  onRemove: (symbol: string) => void;
}

const AssetList: React.FC<AssetListProps> = ({ assets, onRemove }) => (
  <ul>
    {assets.map(asset => (
      <li key={asset.symbol}>
        {asset.name} ({asset.symbol}): ${asset.value} ({asset.change > 0 ? '+' : ''}{asset.change}%)
        <button onClick={() => onRemove(asset.symbol)}>Remove</button>
      </li>
    ))}
  </ul>
);

export default AssetList;