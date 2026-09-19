import React, { useContext, useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './searchBar.css'
import { DataProductApi } from '../../Context/DataBaseProductApi';
import ProductCardComponent from '../ProductCardComponent/ProductCardComponent';

const SearchBar = () => {
    const { getAllProducts } = useContext(DataProductApi)

    const [searchProductInput, setSearchProductInput] = useState()
    const [searchProductArray, setSearchProductArray] = useState([])

    const handleSearch = () => {
        console.log('vamos a buscar => ', searchProductInput);
        //buscar en TODOS LOS PRODUCTOS, coincidencias de nombre, codigo, proveedor...


        const productCoincidence = getAllProducts.filter((product) => product.name.toLowerCase().includes(searchProductInput.toLowerCase()))
        setSearchProductArray(productCoincidence)
        console.log(productCoincidence);


    }

    return (
        <>
            <div className="searchBarContainer">

                <InputGroup className="searchBarContainer_input ">
                    <Form.Control
                        placeholder="Buscador"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        className="bg-light"
                        onChange={(e) => { setSearchProductInput(e.target.value) }}
                    />

                    <button className='searchBarButton rounded-end' id="button-addon2" onClick={() => { handleSearch() }}>
                        <span className="material-symbols-outlined searchBarButton_icon">
                            search
                        </span>
                    </button>
                </InputGroup>
            </div>

            {searchProductArray !== null && <ProductCardComponent productsArray={searchProductArray} />}

        </>
    )
}

export default SearchBar
