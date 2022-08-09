import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './routes/home/home.component';


const Navigation = () => {
  
  return (
    <div>
      <div>
        <h1>I am the navigation bar</h1>
      </div>
      <Outlet></Outlet>
    </div>
  )
}

const Shop = () => {
  return (
    <div>
      I am the Shop Page
    </div>
  )
}


const App = () => {
 

  return (

    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home></Home>}/>
        <Route path='shop' element={<Shop></Shop>} />
      </Route>

      
    </Routes>

  );
}

export default App;
