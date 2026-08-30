import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './searchBar.css'

const SearchBar = () => {
    return (
        <div className="searchBarContainer">

            <InputGroup className="searchBarContainer_input ">
                <Form.Control
                    placeholder="Buscador"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    className="bg-light"

                />
                <button className='searchBarButton' id="button-addon2">
                    <span className="material-symbols-outlined searchBarButton_icon">
                        search
                    </span>
                </button>
            </InputGroup>
        </div>
    )
}

export default SearchBar
