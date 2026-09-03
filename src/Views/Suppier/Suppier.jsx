import React from 'react'
import SearchBar from '../../Components/SearchBar/SearchBar'
import NavBar from '../../Components/NavBar/NavBar'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Suppier = () => {
    return (
        <div className='mt-5'>
            <div className='d-block d-lg-none'>
                <SearchBar />
            </div>
            <h1 className='mt-5'>Provedores</h1>

            <Row xs={2} md={4} className="w-100 g-4 mt-3 mx-auto justify-content-center" >
                <Col>
                    <Card className="h-100 d-flex justify-content-between">
                        <Link to={`/supplier/bariloche`}>


                            <div className='w-100 homeCardImage'>
                                <img className='w-100 h-100 object-fit-cover'
                                    src="https://scontent.faep24-1.fna.fbcdn.net/v/t39.30808-6/458398022_945852254253697_7749023517567883837_n.jpg?stp=dst-jpg_tt6&cstp=mx1967x2048&ctp=s1967x2048&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEZE2T5EKMgBHVgiBmquPYVF5eWNiQLmpQXl5Y2JAualNRcTLc6T4vsOQ_glODy50A&_nc_ohc=G0OiUhjcR38Q7kNvwHCijUi&_nc_oc=AdpxlGMP4aTfPAj3_2ocwww9xmjaCWfa4_HbUhskuEkkiCnNGcfqctiw_Za6B3JuxdY&_nc_zt=23&_nc_ht=scontent.faep24-1.fna&_nc_gid=92Cy7HidR0Icyjw5q7FPgw&_nc_ss=7b2a8&oh=00_AQLGiJklxxiduu_cjWSxUmzwFCj0bBZkdbNJ_CLQ-UEmdw&oe=6A995760"
                                    alt='libreria img' />
                            </div>

                            <Card.Body>
                                <div className='text-center mb-2 text-black'>
                                    <Card.Title>Bariloche</Card.Title>
                                </div>

                            </Card.Body>
                        </Link>
                    </Card>
                </Col>

                <Col>
                    <Card className="h-100 d-flex justify-content-space-between">
                        <Link to={`/supplier/magiclick`}>
                            <div className='w-100 homeCardImage'>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Logo_Oficial_de_la_Marca_Magiclick.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
                                    className='w-100 h-100 object-fit-cover'
                                    alt='libreria img' />
                            </div>

                            <Card.Body>
                                <div className='text-center mt-3 text-black'>
                                    <Card.Title>Magiclick</Card.Title>
                                </div>

                            </Card.Body>
                        </Link>
                    </Card>
                </Col>

                <Col>
                    <Card className="h-100 d-flex justify-content-space-between">
                        <Link to={`/supplier/durax`}>
                            <div className='w-100 homeCardImage'>
                                <img src="https://vajillasdurax.com.ar/images/logo@2x.png"

                                    className='w-100 h-100 object-fit-cover'
                                    alt='libreria img' />
                            </div>

                            <Card.Body>
                                <div className='text-center mt-3 text-black'>
                                    <Card.Title>Durax</Card.Title>
                                </div>

                            </Card.Body>
                        </Link>
                    </Card>
                </Col>

            </Row>

            <NavBar />
        </div>
    )
}

export default Suppier
