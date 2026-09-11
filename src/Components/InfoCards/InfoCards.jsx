import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './infoCard.css';

const InfoCards = () => {
    return (
        <div className='infoCard_component mt-3'>

            <div className='infoCard_body p-3'>
                <div className='infoCard_body_item bg-light rounded p-3 d-flex flex-column'>

                    <section className='d-flex flex-row justify-content-around align-items-center'>
                        <span className="material-symbols-outlined infoCard_body_item-icons" >
                            deployed_code_history
                        </span>
                        <h2>1</h2>
                    </section>

                    <span className='pt-4'>Pedidos Pendientes</span>
                </div>
            </div>

            <div className='infoCard_body p-3'>
                <div className='infoCard_body_item bg-light rounded p-3 d-flex flex-column '>

                    <section className='d-flex flex-row justify-content-around align-items-center'>
                        <span className="material-symbols-outlined infoCard_body_item-icons" >
                            history
                        </span>

                        <h2>2</h2>
                    </section>

                    <span className='pt-4'>Mis pedidos realizados</span>
                </div>
            </div>
        </div>

    )
}

export default InfoCards
