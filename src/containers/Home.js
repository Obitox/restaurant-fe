import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { throttle } from 'lodash';
import _ from 'lodash';

import { homeDataFetchRequest, homeDataFetchCancelled, profile, fetchCategories, fetchMeals, fetchPortions, fetchIngredients, changeTheme } from '../actions/homeActions';
import { addItemToCart, addMealToCart, updateExistingCartItemAmount, updateExistingCartMealAmount } from '../actions/cartActions';
import ItemList from '../components/ItemList';
import CategoryList from '../components/CategoryList';
import MealList from '../components/MealList';
import MealDialog from '../components/MealDialog';
import ItemDialog from '../components/ItemDialog';

import '../styles/main.scss';
import Nav from 'react-bootstrap/Nav';
import ThemeSwitch from '../components/ThemeSwitch';

const mapStateToProps = state => {
    return {
        data: state.homeReducer.data,
        status: state.homeReducer.status,
        categories: state.homeReducer.categories,
        meals: state.homeReducer.meals,
        portions: state.homeReducer.portions,
        ingredients: state.homeReducer.ingredients,
        theme: state.homeReducer.theme,
        cart: state.cartReducer.cart
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDataRequest: () => dispatch(homeDataFetchRequest('REQUEST')),
        fetchDataCancel: () => dispatch(homeDataFetchCancelled('CANCELLED')),
        fetchCategories: () => dispatch(fetchCategories()),
        fetchMeals: () => dispatch(fetchMeals()),
        fetchPortions: () => dispatch(fetchPortions()),
        fetchIngredients: () => dispatch(fetchIngredients()),
        profile: () => dispatch(profile()),
        changeTheme: (theme) => dispatch(changeTheme(theme)),
        addItemToCart: (item) => dispatch(addItemToCart(item)),
        addMealToCart: (amount) => dispatch(addMealToCart(amount)),
        updateExistingCartItemAmount: (cartItems, basePortion, cartItem, index, amount) => dispatch(updateExistingCartItemAmount(cartItems, basePortion, cartItem, index, amount)),
        updateExistingCartMealAmount: (cartMeals, baseMeal, meal, index, amount) => dispatch(updateExistingCartMealAmount(cartMeals, baseMeal, meal, index, amount))
    };
}

class Home extends Component {
    state = {
        search: [],
        category: [],
        item: {},
        baseItem: {},
        portions: [],
        portion: {},
        isOpenItem: false,
        meal: {},
        portionName: '',
        basePrice: 0,
        isOpenMeal: false,
        isFiltered: false,
        isSearching: false,
        ingredientCheckboxes: [],
        id: 0,
        personalPreference: '',
        allergens: [],
        amount: 1,
        mealAmount: 1,
        baseMeal: {}
    };

    handleSearchThrottled = throttle((event, items) => {
            const searchValue = event.target.value;
            let searchArray = [];
            if(searchValue === '' || searchValue === null || searchValue === undefined)
            {
                this.setState({
                    isSearching: false,
                    search: []
                });
                return;
            }

            for(let i = 0; i < items.length; i++){
                if(items[i].title.includes(searchValue))
                    searchArray.push(items[i]);
            }
            
            this.setState({
                search: searchArray,
                isSearching: true
            });
            return;
    }, 500)

    componentDidMount = () => {
        // TODO: Consider making this a single object
        this.props.fetchDataRequest();
        this.props.fetchCategories();
        this.props.fetchMeals();
        this.props.fetchPortions();
        this.props.fetchIngredients();
    }

    componentWillUnmount = () => { 
        if(this.props.status === "REQUEST")
            this.props.fetchDataCancel();
    }

    switchToLogin = () => {
        this.props.history.push("/login");
    }

    profile = () => {
        this.props.profile();
    }

    handleSearch = event => {
        event.persist();
        this.handleSearchThrottled(event, this.props.data);
    }

    handleCategorySelect = (id) => {
        let category = [];
        const items = this.props.data;

        if(id === this.state.id)
        {
            this.setState({
                isFiltered: !this.state.isFiltered
            });
            return;
        }
        
        for(let i = 0; i < items.length; i++)
            if(items[i].categoryId === id)
                category.push(items[i]);

        this.setState({
            category: category,
            isFiltered: true,
            id: id
        });
    }

    openMealDialog = (meal) => {
        this.setState({
            isOpenMeal: true,
            meal: meal,
            baseMeal: meal
        });
    }

    handleIngredientCheck = (evt, index) => {
        let ingredientCheckboxes = this.state.ingredientCheckboxes;

        if(index === undefined || ingredientCheckboxes[index] === undefined)
            return;

        ingredientCheckboxes[index].isChecked = evt.target.checked;

        this.setState(
          {ingredientCheckboxes: ingredientCheckboxes}
        );
    }

    openItemDialog = (item) => {
        // let portions = this.props.portions.filter(portion => portion.categoryPortion[0].categoryId == item.categoryId);

        let baseItem = Object.assign({}, this.props.data.find(listItem => listItem.itemId == item.itemId));
        let newItem = Object.assign({}, item);

        let ingredientsList = [];
        let ingredientCheckboxes = [];
        let allergens = [];
        for(let ingredient of this.props.ingredients)
            for(let itemIngredient of ingredient.itemIngredient)
                if(itemIngredient.itemId == newItem.itemId)
                {
                    ingredientsList.push(ingredient);
                    ingredientCheckboxes.push(
                        {
                            id: ingredient.ingredientId,
                            title: ingredient.title,
                            isChecked: false
                        }
                    );
                    if(ingredient.allergens !== undefined && ingredient.allergens.length > 0)
                        allergens.push(ingredient.allergens);
                }
        
        // let ingredientCheckboxes = filteredIngredients.map(
        //     ingredient => <Checkbox key={ingredinet} checked={ingredient.isChecked}></Checkbox>
        // );
        
        this.setState({
            isOpenItem: true,
            item: newItem,
            baseItem: baseItem,
            ingredients: ingredientsList,
            ingredientCheckboxes: ingredientCheckboxes,
            allergens: allergens
        });
    }

    closeMealDialog = () => {
        this.setState({
            isOpenMeal: false,
            meal: {},
            mealAmount: 1
        });
    }

    closeItemDialog = () => {
        this.setState({
            isOpenItem: false,
            item: {},
            baseItem: {},
            portionName: '',
            amount: 1
        });

    }

    handleChange = e => {
        let value = e.target.value;
        if(!isNaN(value))
        {
            value = parseInt(value);
            if(value > 0 && this.state.portionName !== '')
            {
                let portion = Object.assign({}, this.state.portion);
                let baseItem = Object.assign({}, this.state.baseItem);
                let p = baseItem.portions.find(portion => portion.title === this.state.portionName);
                portion.price = p.price * value;
                portion.calorieCount = p.calorieCount * value;
                portion.mass = p.mass * value;

                this.setState({
                   [e.target.name]: value,
                   portion: portion
                });
                return;
            }

            this.setState({
                   [e.target.name]: 1,
            });
            return;
        }

        this.setState({
            [e.target.name]: value
        });
    }

    handleMealAmountChange = e => {
        let value = e.target.value;

        if(!isNaN(value)){
            value = parseInt(value);
            if(value > 0){
                let meal = Object.assign({}, this.state.meal);
                let baseMeal = Object.assign({}, this.state.baseMeal);
                // TODO: Multiply calorie and mass of meal
                meal.price = baseMeal.price * value;

                this.setState({
                    [e.target.name]: value,
                    meal: meal
                });
                return;
            }
        }

        this.setState({
                [e.target.name]: 1,
        });
        return;
    }

    handlePortionChange = (event, item) => {
        const selectedPortionName = event.target.value;
        const currentPortionName = this.state.portionName;
        const amount = this.state.amount;

        if(selectedPortionName === currentPortionName)
            return;
        else if(selectedPortionName !== currentPortionName && amount > 0)
        {
            let portion = null;
            let newItem = Object.assign({}, item);
            // let baseItem = Object.assign({}, this.props.data.find(i => i.id == item.id));
            let baseItem = Object.assign({}, this.state.baseItem);
            
            for(let j = 0; j < baseItem.portions.length; j++)
                if(baseItem.portions[j].title === selectedPortionName)
                {
                        portion = Object.assign({}, newItem.portions[j]);
                        portion.price = baseItem.portions[j].price * amount;
                        portion.calorieCount = baseItem.portions[j].calorieCount * amount;
                        portion.mass = baseItem.portions[j].mass * amount;
                        break;
                }
            
            this.setState({
                [event.target.name]: selectedPortionName,
                // baseItem: baseItem,
                portion: portion,
            });
            return;
        }    
    }

    handleThemeSwitch = (event) => {
        if(event.target.checked)
        {
            this.props.changeTheme('dark');
            return;
        }

        this.props.changeTheme('light');
    }

    addItemToCart = (id, title, portion, amount, personalPreference) => {
        // const cartItems = [...this.props.cart.items];
        const cart = _.cloneDeep(this.props.cart);
        console.log(cart);
        // const cartItems = this.props.cart.items;
        const index = cart.items.findIndex(item => item.id === id && item.portion.title === portion.title);
        if(index !== -1){
            const cartItem = cart.items[index];

            if(cartItem.title === title && cartItem.portion.title === portion.title){
                // Makes no sense, because I'm always adding
                // if(cartItem.amount !== amount)
                const basePortion = Object.assign({}, this.state.baseItem.portions.find(p => p.id === portion.id));
                this.props.updateExistingCartItemAmount(cart, basePortion, cartItem, index, amount);
                // TODO: Add message for updated existing in toaster
                this.setState({
                    isOpenItem: false,
                    item: {},
                    baseItem: {},
                    portionName: '',
                    amount: 1       
                });
                return;
            }
        }

        let item = {
            id, 
            title, 
            portion, 
            amount,
            personalPreference
        };
        this.props.addItemToCart(item);
        // TODO: Add message for new in toaster 
        this.setState({
            isOpenItem: false,
            item: {},
            baseItem: {},
            portionName: '',
            amount: 1
        });
    }

    addMealToCart = (meal, amount) => {
        const cart = _.cloneDeep(this.props.cart);
        const index = cart.meals.findIndex(meal => meal.mealId);

        if(index !== -1){
            const baseMeal = _.cloneDeep(this.state.baseMeal);
            const cartMeal = cart.meals[index];
            // TODO: Add message for updated existing in toaster
            this.props.updateExistingCartMealAmount(cart, baseMeal, cartMeal, index, amount);
            this.setState({
                isOpenMeal: false,
                meal: {},
                baseMeal: {},
                mealAmount: 1
            });
            return;
        }    

        let cartMeal = {
            ...meal,
            amount: amount
        }
        this.props.addMealToCart(cartMeal);
        // TODO: Add message for new in toaster 
        this.setState({
            isOpenMeal: false,
            meal: {},
            baseMeal: {},
            mealAmount: 1
        });
    }

    render() {
        let categoryList = null;
        if(this.props.categories.length > 0)
            categoryList = (
                <div className="category-list">
                    <Nav defaultActiveKey="/home" className="flex-column">
                        <CategoryList categories={this.props.categories} categorySelect={(id) => this.handleCategorySelect(id)}/>
                    </Nav>                    
                </div>
            );
        
        let itemDialog = null;
        if(this.state.isOpenItem && this.state.item != undefined && this.props.ingredients.length > 0)
            itemDialog = (
                <ItemDialog theme={this.props.theme} portion={this.state.portion} isOpen={this.state.isOpenItem} item={this.state.item} portionName={this.state.portionName} ingredientCheckboxes={this.state.ingredientCheckboxes} handleIngredientCheck={this.handleIngredientCheck} handlePortionChange={this.handlePortionChange} handleClose={this.closeItemDialog} handleChange={this.handleChange} addItemToCart={this.addItemToCart} personalPreference={this.state.personalPreference} allergens={this.state.allergens} amount={this.state.amount}/>
            );
        
        let mealDialog = null;
        if(this.state.isOpenMeal && this.state.meal != undefined)
            mealDialog = (
                <MealDialog theme={this.props.theme} isOpen={this.state.isOpenMeal} meal={this.state.meal} handleClose={this.closeMealDialog} handleMealAmountChange={this.handleMealAmountChange} mealAmount={this.state.mealAmount} addMealToCart={this.addMealToCart} />
            );
                
        let mealList = null;
        if(this.props.meals.length > 0)
            mealList = (
                <div className="meal-list">
                   <MealList meals={this.props.meals} openMealDialog={(meal) => this.openMealDialog(meal)}/> 
                </div>
            );        
            
        let component = null;
        if(this.props.status === "REQUEST")
            component = (
                <div>Loading</div>
            );
        else if(this.props.status === "SUCCESS" && this.props.data.length > 0 && !this.state.isSearching && !this.state.isFiltered)
            component = (
                <div className="items">
                    <div className="search">
                        <input type="text" onChange={this.handleSearch}/>
                    </div>
                    <div className="item-list">
                        <ItemList data={this.props.data} openItemDialog={(item) => this.openItemDialog(item)}/>
                    </div>
                </div>
            );
        else if(this.props.data.length > 0 && this.state.isSearching && !this.isFiltered)
        {
            component = (
                <div className="items">
                    <div className="search">
                        <input type="text" 
                        onChange={this.handleSearch}/>
                    </div>                   
                    <div className="item-list">
                        <ItemList data={this.state.search} />
                    </div>
                </div>
            );
        }
        else if(this.props.data.length > 0 && this.state.isFiltered && !this.isSearching)
        {
            component = (
                <div className="items">
                    <div className="search">
                        <input type="text" 
                        onChange={this.handleSearch}/>
                    </div>                   
                    <div className="item-list">
                        <ItemList data={this.state.category} />
                    </div>
                </div>
            );
        }
        else if(this.props.status === "ERROR")
            component = (
                <div>{this.props.status}</div>
            );
        else
            component = (
                <div>No data</div>
            );

        return (
            <div className="main">
                {categoryList}
                {component}
                {mealList}
                {mealDialog}
                {itemDialog}
                {/* <MealDialog isOpen={this.state.isOpenMeal} meal={this.state.meal} handleClose={this.closeMealDialog}/> */}
                <ThemeSwitch handleThemeSwitch={this.handleThemeSwitch}/>
                <Link to={`/login`}>
                    Login EY
                </Link>
                <button onClick={this.profile}>
                    Profile
                </button>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);