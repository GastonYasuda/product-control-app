import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Row, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { DataProductApi } from '../../Context/DataBaseProductApi'
import './mainCard.css'

const MainCard = ({ cardName }) => {

    const { getAllProducts } = useContext(DataProductApi)
    const [elementsArray, setElementsArray] = useState([])

    useEffect(() => {

        if (getAllProducts.length > 0) {
            if (cardName === 'category') {
                const uniqueCategory = [
                    ...new Map(
                        getAllProducts.map(prod => [
                            prod.category.name,
                            {
                                name: prod.category.name,
                                img: prod.category.img
                            }
                        ])
                    ).values()
                ];


                setElementsArray(uniqueCategory);
                console.log(uniqueCategory);


            } else if (cardName === 'supplier') {
                const uniqueSuplier = [
                    ...new Map(
                        getAllProducts.map(prod => [
                            prod.supplier.name,
                            {
                                name: prod.supplier.name,
                                img: prod.supplier.img
                            }
                        ])
                    ).values()
                ];

                setElementsArray(uniqueSuplier);
            }
        }

    }, [getAllProducts])




    return (
        <Row xs={2} md={4} className="mainCardComponent w-100 g-4  mx-auto justify-content-center" >

            {elementsArray.length > 0 ?
                elementsArray.map((selectElement, i) => (
                    <Col key={i}>
                        <Card className="h-100 d-flex justify-content-space-between">
                            <Link to={`/${cardName}/${selectElement.name}`}>

                                <div className='homeCardImage d-flex justify-content-center align-items-center'>
                                    {cardName === 'category' ?
                                        <span className="material-symbols-outlined">
                                            {selectElement.img}
                                        </span>
                                        :
                                        <img src={selectElement.img} className='w-75' />
                                    }


                                </div>



                                <Card.Body>
                                    <div className='text-center mt-3 text-black'>
                                        <h5>{selectElement.name}</h5>
                                    </div>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                ))
                :
                <Spinner animation="grow" variant="success" className='loadingSpinner' />
            }



        </Row>
    )
}

export default MainCard
