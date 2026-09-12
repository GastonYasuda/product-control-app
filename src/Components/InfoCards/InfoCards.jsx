import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './infoCard.css';

const InfoCards = ({ cardParams }) => {
    return (
        <div className='infoCard_component mt-3'>

            {cardParams.map((card, i) => (
                <div className='infoCard_body p-3' key={i}>
                    <div className='infoCard_body_item bg-light rounded p-3 d-flex flex-column'>

                        <section className='d-flex flex-row justify-content-around align-items-center'>
                            <span className="material-symbols-outlined infoCard_body_item-icons" >
                                {card.icon}
                            </span>
                            <h2>{card.count}</h2>
                        </section>

                        <span className='pt-4'>{card.title}</span>
                    </div>
                </div>
            ))}

        </div>

    )
}

export default InfoCards
