import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders';
const INGREDIENT_PRICES = {
    salad: 30,
    cheese: 20,
    bacon: 45,
    meat: 50
}
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        purchaseable: false,
        purchasing: false,
        loading: false,
        basePrice: 100
    }
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey]
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchaseable: sum > 0 })
        console.log(this.state.purchaseable)
    }
    addIngredientHandler = (type) => {
        const newCount = this.state.ingredients[type] + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = newCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.basePrice + priceAddition;
        this.setState({ ingredients: updatedIngredients, basePrice: newPrice })
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        console.log(oldCount)
        const newCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = newCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const newPrice = this.state.basePrice - priceDeduction;
        this.setState({ ingredients: updatedIngredients, basePrice: newPrice })
        this.updatePurchaseState(updatedIngredients)

    }
    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = () => {
        // alert('çontinue')
        this.setState({loading:true})
        const order = {
            ingredients:this.state.ingredients,
            basePrice: this.state.basePrice,
            customer:{
                name: 'pratyush',
                address:{
                city: 'mumbai',
                zipCode:'32424'
                },
            email:'chalcaj@sds.com'
            },
            deliveryMethod: 'urgent'
        }
        axios.post('/orders.json',order).then(res => {
            console.log(res);
        this.setState({loading:false, purchasing:false})
        })
        .catch(error => {
            this.setState({loading:false, purchasing:false})
            console.log(error)
        })
    }




    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = <OrderSummary ingredients={this.state.ingredients} cancel={this.purchaseCancelHandler}
        continue={this.purchaseContinueHandler}
        price={this.state.basePrice} />
    if(this.state.loading) {
        orderSummary = <Spinner/>
    }
        console.log(this.state.purchaseable)

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary }
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientadded={this.addIngredientHandler}
                    ingredientremoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.basePrice}
                    purchaseable={this.state.purchaseable}
                    purchasing={this.purchaseHandler} />
            </Aux>
        )
    }
}

export default BurgerBuilder;