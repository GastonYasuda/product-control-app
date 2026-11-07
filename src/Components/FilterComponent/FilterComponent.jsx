import React, { useContext } from 'react'
import { Dropdown, DropdownItem } from 'react-bootstrap'
import { ProductApi } from '../../Context/ProductControlApi';

const FilterComponent = ({ setFilter, showFilter }) => {

    const { statuses } = useContext(ProductApi);



    const statusClass = (name) =>
        name === 'Entregado' ? 'bg-secondary'
            : name === 'Preparado' ? 'bg-success'
                : name === 'En Preparación' ? 'bg-info'
                    : 'bg-primary'


    return (
        <Dropdown className='navBar_container_item mt-3'>
            <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className={`d-flex align-items-end ${statusClass(showFilter.status_name)}`}
            >
                {showFilter.status_name || showFilter.status_name === undefined && showFilter}

                <span className="material-symbols-outlined mt-1 ps-1">stat_minus_1</span>
            </Dropdown.Toggle>

            <Dropdown.Menu className='mt-5 rounded'>
                {statuses.map((s) => (
                    <Dropdown.Item
                        key={s.status_id}
                        className='dropdown-menu-txt pt-2'
                        onClick={() => setFilter(s)}
                    >
                        {s.status_name}
                    </Dropdown.Item>
                ))}
                <DropdownItem className='dropdown-menu-txt pt-2' onClick={() => setFilter("Todos")}>Todos</DropdownItem>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default FilterComponent
