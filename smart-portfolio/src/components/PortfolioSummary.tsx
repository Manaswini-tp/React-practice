import React from 'react';

interface Asset {
  name: string;
  symbol: string;
  value: number;
  change: number;
}

interface PortfolioSummaryProps {
  assets: Asset[];
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ assets }) => {
  // Calculate total value
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  
  // Calculate average change
  const avgChange = assets.length > 0 
    ? assets.reduce((sum, asset) => sum + asset.change, 0) / assets.length 
    : 0;
  
  return (
    <div style={{ padding: '15px', backgroundColor: '#f0f0f0', margin: '20px 0' }}>
      <h3>Portfolio Summary</h3>
      <p>Total Value: ${totalValue.toFixed(2)}</p>
      <p>Average Change: {avgChange > 0 ? '+' : ''}{avgChange.toFixed(2)}%</p>
      <p>Number of Assets: {assets.length}</p>
    </div>
  );
};

export default PortfolioSummary;