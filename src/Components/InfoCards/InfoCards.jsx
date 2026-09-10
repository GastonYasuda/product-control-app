import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const InfoCards = () => {
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>

            <div className='w-100 h-100 p-3'>
                <div className='bg-light rounded w-50 h-50 p-3'>
                    <span>ICONO</span>
                    <h6>Mis pedidos realizados</h6>
                </div>
            </div>
        </>

    )
}

export default InfoCards
