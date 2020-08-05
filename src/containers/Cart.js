import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartItemList from '../components/CartItemList';
import CartMealList from '../components/CartMealList';

import { updateExistingCartItemAmount, updateExistingCartMealAmount } from '../actions/cartActions';
import { orderRequest } from '../actions/orderActions';

import Button from 'react-bootstrap/Button';

import '../styles/cart.scss';

import _ from 'lodash';

const mapStateToProps = state => {
    return {
        cart: state.cartReducer.cart,
        price: state.cartReducer.price,
        auth: state.loginReducer.auth,
        message: state.orderReducer.message,
        order: state.orderReducer.order
        // cartItems: state.cartReducer.cart.items,
        // cartMeals: state.cartReducer.cart.meals,
        // items: state.homeReducer.data,
        // meals: state.homeReducer.meals
    };
}

const mapDispatchToProps = dispatch => {
    return {
        updateExistingCartItemAmount: (cartItems, basePortion, cartItem, index, amount) => dispatch(updateExistingCartItemAmount(cartItems, basePortion, cartItem, index, amount)),
        updateExistingCartMealAmount: (cartMeals, baseMeal, meal, index, amount) => dispatch(updateExistingCartMealAmount(cartMeals, baseMeal, meal, index, amount)),
        removeCartItem: index => dispatch({
            type: 'REMOVE_CART_ITEM',
            index
        }),
        removeCartMeal: index => dispatch({
            type: 'REMOVE_CART_MEAL',
            index
        }),
        setPrice: price => dispatch({
            type: 'SET_PRICE',
            price
        }),
        createOrder: order => dispatch(orderRequest(order)) 
    };
}

class Cart extends Component {
    componentDidMount = () => {
        this.setPrice();
    }
    
    setPrice = () => {
        const { items, meals } = this.props.cart;

        if(items.length === 0 && meals.length === 0)
        {
            this.props.setPrice(0);
            return;
        }

        let price = 0;
        for (let index = 0; index < items.length; index++)
            price += items[index].portion.price;
        const totalItemPrice = price; 
        price = 0;
        for (let index = 0; index < meals.length; index++)
            price += meals[index].price;
        const totalMealPrice = price;
        
        this.props.setPrice(totalItemPrice + totalMealPrice);
    }

    // cartElement represents either item or meal which can be added to cart
    incrementAmount = (index, cartElement) => {
        const cart = _.cloneDeep(this.props.cart);
        const cartItems = cart.items;
        
        if(typeof cartItems[index] !== "undefined"){
            if(cartItems[index].title === cartElement.title){
                let basePortion = _.cloneDeep(cartElement.portion);
                basePortion.price /= cartElement.amount; 
                basePortion.calorieCount /= cartElement.amount; 
                basePortion.mass /= cartElement.amount; 
                basePortion.amount = 1;
                this.props.updateExistingCartItemAmount(cart, basePortion, cartElement, index, 1)
                this.setPrice();
            }
        }

        const cartMeals = cart.meals;
        if(typeof cartMeals[index] !== "undefined"){
            if(cartMeals[index].title === cartElement.title)
            {
                let baseMeal = _.cloneDeep(cartElement);
                baseMeal.price /= cartElement.amount;
                baseMeal.amount = 1;
                this.props.updateExistingCartMealAmount(cart, baseMeal, cartElement, index, 1);
                this.setPrice();
            }
        }
    }
    
    decrementAmount = (index, cartElement) => {
        if(cartElement.amount - 1 <= 0)
            return;
        
        const cart = _.cloneDeep(this.props.cart);
        const cartItems = cart.items;
        
        if(typeof cartItems[index] !== "undefined"){
            if(cartItems[index].title === cartElement.title){
                let basePortion = _.cloneDeep(cartElement.portion);
                basePortion.price /= cartElement.amount; 
                basePortion.calorieCount /= cartElement.amount; 
                basePortion.mass /= cartElement.amount; 
                basePortion.amount = -1;
                this.props.updateExistingCartItemAmount(cart, basePortion, cartElement, index, -1)
                this.setPrice();
            }
        }

        const cartMeals = cart.meals;
        if(typeof cartMeals[index] !== "undefined"){
            if(cartMeals[index].title === cartElement.title)
            {
                let baseMeal = _.cloneDeep(cartElement);
                baseMeal.price /= cartElement.amount;
                baseMeal.amount = -1;
                this.props.updateExistingCartMealAmount(cart, baseMeal, cartElement, index, -1);
                this.setPrice();
            }
        }
    }
    
    removeCartItem = index => {
        let { items, meals } = _.cloneDeep(this.props.cart);

        items = [
            ...items.slice(0, index),
            ...items.slice(index + 1)
        ];

        if(items.length === 0 && meals.length === 0)
        {
            this.props.setPrice(0);
            this.props.removeCartItem(index);
            return;
        }

        let price = 0;
        for (let index = 0; index < items.length; index++)
            price += items[index].portion.price;
        const totalItemPrice = price; 
        price = 0;
        for (let index = 0; index < meals.length; index++)
            price += meals[index].price;
        const totalMealPrice = price;
        
        this.props.setPrice(totalItemPrice + totalMealPrice);
        this.props.removeCartItem(index);
    }

    removeCartMeal = index => {
        let { items, meals } = _.cloneDeep(this.props.cart);

        meals = [
            ...meals.slice(0, index),
            ...meals.slice(index + 1)
        ];

        if(items.length === 0 && meals.length === 0)
        {
            this.props.setPrice(0);
            this.props.removeCartMeal(index);
            return;
        }

        let price = 0;
        for (let index = 0; index < items.length; index++)
            price += items[index].portion.price;
        const totalItemPrice = price; 
        price = 0;
        for (let index = 0; index < meals.length; index++)
            price += meals[index].price;
        const totalMealPrice = price;
        
        this.props.setPrice(totalItemPrice + totalMealPrice);
        this.props.removeCartMeal(index);
    }

    createOrder = (auth, items, meals) => {
        // if(typeof auth.username === "undefined")
        //     this.props.history.push("/login");

        const price = this.props.price;

        const order = {
            Cart: {
                Items: items,
                Meals: meals
            },
            Price: price 
        };

        this.props.createOrder(order);
    }

    render() {
        const {items, meals} = this.props.cart;
        const price = this.props.price;

        const { order, message } = this.props;
        console.log(order);
        console.log(message);

        return (
            <div className="cart-container">
                <CartItemList items={items} incrementAmount={this.incrementAmount} decrementAmount={this.decrementAmount} removeCartItem={this.removeCartItem} />
                <CartMealList meals={meals} incrementAmount={this.incrementAmount} decrementAmount={this.decrementAmount} removeCartMeal={this.removeCartMeal} />
                <hr/>
                <div className="cart-container-price">
                    <p>Total: {price}</p>
                    <Button type="submit" color="primary" onClick={() => this.createOrder(this.props.auth, items, meals)}>Potvrdi</Button>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);