import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './searchBar.css'
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {

    const navigate = useNavigate()

    const [searchProductInput, setSearchProductInput] = useState()

    const handleSearch = () => {
        // console.log('vamos a buscar => ', searchProductInput);

        navigate(`/searchResults/${searchProductInput}`);
    }

    return (
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

    )
}

export default SearchBar
