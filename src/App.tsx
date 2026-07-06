import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import MockTest from './pages/MockTest';
import Results from './pages/Results';
import Progress from './pages/Progress';
import Learn from './pages/Learn';
import Practice from './pages/Practice';
import Help from './pages/Help';


function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/test" element={<MockTest />} />
            <Route path="/results" element={<Results />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
