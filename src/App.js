import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import AllRecord from './AllRecord';

function App(){
    return(
        <div>
            <Routes>
                <Route path='/' element={<AllRecord/>}></Route>
                <Route path='/create' element={<Dashboard/>}></Route>
            </Routes>
        </div>
    )
}

export default App;