import './css/App.css';
import { BrowserRouter } from 'react-router-dom'
import BaseRouter from './routes';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <BaseRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
