import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
// import CheckoutSummary from '../../Order/Checkout/CheckoutSummary'
const CheckoutSummary = (props) => {
return (
    <div>
        <h1>we hope it tatses well</h1>
        <div style={{width:'100%',margin:'auto'}}>
        <Burger ingredients ={props.ingredients}/>
        </div>
    <Button btnType="Danger"
    clicked>CANCEL</Button>
    <Button btnType="SUCCESS"
    clicked>CONTINUE </Button>
    </div>
)
}

export default CheckoutSummary