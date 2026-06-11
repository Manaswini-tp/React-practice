import React, { useReducer, useState } from 'react';
import AssetCard from './components/AssetCard';
import AssetForm from './components/AssetForm';
import AssetList from './components/AssetList';
import PortfolioSummary from './components/PortfolioSummary';
import AssetEditor from './components/AssetEditor';

interface Asset {
  name: string;
  symbol: string;
  value: number;
  change: number;
}

interface PortfolioState {
  assets: Asset[];
}

type PortfolioAction = 
  | { type: 'ADD'; asset: Asset }
  | { type: 'REMOVE'; symbol: string };

function portfolioReducer(state: PortfolioState, action: PortfolioAction): PortfolioState {
  switch (action.type) {
    case 'ADD':
      return { ...state, assets: [...state.assets, action.asset] };
    case 'REMOVE':
      return { ...state, assets: state.assets.filter(a => a.symbol !== action.symbol) };
    default:
      return state;
  }
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(portfolioReducer, { assets: [] });
  const [showEditor, setShowEditor] = useState(false);

  const handleAdd = (asset: Asset) => {
    dispatch({ type: 'ADD', asset });
  };

  const handleRemove = (symbol: string) => {
    dispatch({ type: 'REMOVE', symbol });
  };

  const handleUpdate = (updatedAsset: Asset) => {
    // First remove old, then add updated
    dispatch({ type: 'REMOVE', symbol: updatedAsset.symbol });
    dispatch({ type: 'ADD', asset: updatedAsset });
    setShowEditor(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Smart Portfolio Dashboard</h1>
      
      <PortfolioSummary assets={state.assets} />
      
      <AssetForm onAdd={handleAdd} />
      
      <button onClick={() => setShowEditor(!showEditor)}>
        {showEditor ? 'Hide' : 'Show'} Asset Editor
      </button>
      
      {showEditor && <AssetEditor onUpdate={handleUpdate} />}
      
      <AssetList assets={state.assets} onRemove={handleRemove} />
    </div>
  );
};

export default App;