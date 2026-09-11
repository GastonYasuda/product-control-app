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
                const uniqueCategory = [...new Set(getAllProducts.map(prod => prod.category))];
                setElementsArray(uniqueCategory);

            } else if (cardName === 'supplier') {
                const uniqueSuplier = [...new Set(getAllProducts.map(prod => prod.supplier))];
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
                            <Link to={`/${cardName}/${selectElement}`}>

                                <div className='w-100 homeCardImage'>
                                    <img src="https://lirp.cdn-website.com/a2bff480/dms3rep/multi/opt/imagen-1+%282%29-1920w.png"
                                        className='w-100 h-100 object-fit-cover'
                                        alt='libreria img' />
                                </div>

                                <Card.Body>
                                    <div className='text-center mt-3 text-black'>
                                        <h5>{selectElement}</h5>
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
