import React from 'react';

import Meal from './Meal';

function MealList({ meals, openMealDialog }) {
    return (
        meals.map(meal => <Meal key={meal.mealId} meal={meal} openMealDialog={openMealDialog} />)
    )
}

export default MealList
