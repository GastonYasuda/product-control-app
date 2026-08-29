import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './searchBar.css'

const SearchBar = () => {
    return (
        <InputGroup className="mt-3 ps-3 pe-3 searchBarContainer">
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
    )
}

export default SearchBar
