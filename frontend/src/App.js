import Hero from './components/Hero'
import Signup from './components/Signup'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={( 
            <>
              <Hero />
            </>
          )} />
          <Route path='/signup' element={(
            <>
              <Signup />
            </>
          )} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
