import React from 'react';
import Aux from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igkey => {
            return <li key={igkey}>
                <span style={{ textTransform: 'capitalize' }}>{igkey}</span>:{props.ingredients[igkey]}
            </li>
        })
    return (
        <Aux>
            <h3>Your Order Summary</h3>
            <p>Total Price <strong>Rs.{props.price}</strong></p>
            <p>A delicious Burger is waiting for you.</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout ?</p>
            <Button btnType="Success" clicked={props.continue} >CONTINUE</Button>
            <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>

        </Aux>
    )
}

export default OrderSummary 