import React from 'react'

import Button from 'react-bootstrap/Button';

function Meal({ meal, openMealDialog}) {
    return (
        <div className="meal">
            <img src={meal.image[0].path} alt={meal.title} />
            <p>{meal.price}</p>
            <Button  type="submit" onClick={() => openMealDialog(meal)}>Dodaj u korpu</Button>
        </div>
    )
}

export default Meal