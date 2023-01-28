import {Route, Routes, Link, HashRouter} from 'react-router-dom';
import routes from './route.js';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <h1>首页</h1>
        <Link to = '/Management'>Management</Link>
        <br/>
        <Link to = '/Recognition'>Recognition</Link>
        <Routes>
          {
            routes.map((item, key) => {
              return (
                <Route 
                  key={key}
                  path={item.path} 
                  element={<item.component/>}
                />
              )
            })
          }
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
