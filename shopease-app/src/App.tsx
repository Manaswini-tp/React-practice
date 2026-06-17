// src/App.tsx
import React, { useState, Suspense, lazy } from 'react';
import ProductList from './components/ProductList';
import ProductListOptimized from './components/ProductList';
import Chart from './components/Chart';
import DatePicker from './components/DatePicker';

// Lazy load heavy admin panel (code splitting)
const AdminPanel = lazy(() => import('./components/AdminPanel'));

const App: React.FC = () => {
  const [showOptimized, setShowOptimized] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const chartData = [65, 59, 80, 81, 56, 55, 40];
  const chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>ShopEase E-Commerce Platform</h1>
      <h3>Bundle Analysis Demo</h3>

      {/* Bundle Size Comparison */}
      <div style={{
        padding: '15px',
        backgroundColor: '#e8f5e9',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h4>📊 Bundle Size Impact Analysis</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#c8e6c9' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>Component</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Bundle Impact</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>ProductList (BAD)</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd', color: '#f44336' }}>~75KB (lodash + moment)</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>❌ Imports entire libraries</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>ProductList (GOOD)</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd', color: '#4caf50' }}>~5KB (only needed functions)</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>✅ Selective imports + date-fns</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Chart.js</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd', color: '#f44336' }}>~200KB</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>⚡ Consider lighter alternative</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Moment.js</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd', color: '#f44336' }}>~70KB</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>⚡ Replace with date-fns (~5KB)</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>Admin Panel</td>
              <td style={{ padding: '8px', color: '#4caf50' }}>~80KB (lazy loaded)</td>
              <td style={{ padding: '8px' }}>✅ Code splitting!</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Toggle between implementations */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setShowOptimized(!showOptimized)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          {showOptimized ? 'Show BAD Implementation' : 'Show GOOD Implementation'}
        </button>
      </div>

      {/* Product List Component */}
      {showOptimized ? (
        <ProductListOptimized />
      ) : (
        <ProductList />
      )}

      {/* Heavy Components (Toggle to see impact) */}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => setShowChart(!showChart)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff9800',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          {showChart ? 'Hide' : 'Show'} Chart (200KB)
        </button>
        
        <button
          onClick={() => setShowDatePicker(!showDatePicker)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#9c27b0',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          {showDatePicker ? 'Hide' : 'Show'} DatePicker (70KB)
        </button>

        <button
          onClick={() => setShowAdmin(!showAdmin)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {showAdmin ? 'Hide' : 'Show'} Admin Panel (Lazy Loaded)
        </button>
      </div>

      {showChart && <Chart data={chartData} labels={chartLabels} />}
      {showDatePicker && <DatePicker />}
      
      {showAdmin && (
        <Suspense fallback={<div>Loading admin panel...</div>}>
          <AdminPanel />
        </Suspense>
      )}

    </div>
  );
};

export default App;
