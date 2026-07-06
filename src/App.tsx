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
import LearnChapter from './pages/LearnChapter';
import PracticeTopic from './pages/PracticeTopic';


function App() {
  return (
    <AppProvider>
      <Router basename="/NY-DMV-Class-D-Prep">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/:chapterId" element={<LearnChapter />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/practice/:topicId" element={<PracticeTopic />} />
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
