// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductControlApi from './Context/ProductControlApi.jsx'
import DataBaseProductApi from './Context/DataBaseProductApi.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';



createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <DataBaseProductApi>
    <ProductControlApi>
      <App />
    </ProductControlApi>
  </DataBaseProductApi>
  // </StrictMode>,

)
