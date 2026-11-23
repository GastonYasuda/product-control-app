import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Row, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { DataProductApi } from '../../Context/DataBaseProductApi'
import './mainCard.css'

const MainCard = ({ cardName }) => {

    //const { getAllProducts } = useContext(DataProductApi)
    const [elementsArray, setElementsArray] = useState([])

    useEffect(() => {
        getAllCategorySupplier(cardName)

        if (elementsArray.length > 0) {
            if (cardName === 'category') {
                const uniqueCategory = [
                    ...new Map(
                        elementsArray.map(prod => [
                            prod.category.name,
                            {
                                name: prod.category_name,
                                img: prod.category_img
                            }
                        ])
                    ).values()
                ];


                setElementsArray(uniqueCategory);



            } else if (cardName === 'supplier') {
                const uniqueSuplier = [
                    ...new Map(
                        elementsArray.map(prod => [
                            prod.supplier_name,
                            {
                                name: prod.supplier_name,
                                img: prod.supplier_img
                            }
                        ])
                    ).values()
                ];

                setElementsArray(uniqueSuplier);
            }

        }

    }, [])


    const getAllCategorySupplier = async (card_name) => {
        const response = await fetch(`https://product-control-back.onrender.com/${card_name}`)
        if (response.ok) {
            const data = await response.json()
            setElementsArray(data)
        } else {
            throw new Error("Error al intentar obtener datos");

        }
    }




    return (
        <Row xs={2} md={4} className="mainCardComponent w-100 g-4  mx-auto justify-content-center" >

            {elementsArray.length > 0 ?
                elementsArray.map((selectElement, i) => (
                    <Col key={i}>
                        <Card className="d-flex justify-content-space-between">
                            <Link to={`/${cardName}/${selectElement[`${cardName}_name`]}`}>
                                <div className='homeCardImage d-flex justify-content-center align-items-center'>
                                    {cardName === 'category' ?
                                        <span className="material-symbols-outlined">
                                            {selectElement.category_img}
                                        </span>
                                        :
                                        <img src={selectElement.supplier_img} className='w-75' />
                                    }
                                </div>

                                <Card.Body>
                                    <div className='text-center text-black'>
                                        <h5>{selectElement.category_name}</h5>
                                    </div>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                ))
                :
                <Spinner animation="grow" variant="success" className='loadingSpinner' />
            }



        </Row >
    )
}

export default MainCard
