import React from 'react';

import Button from 'react-bootstrap/Button';
// import InputGroup from 'react-bootstrap/InputGroup';
// import FormControl from 'react-bootstrap/FormControl';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import '../styles/theme.scss';

function MealDialog({theme, isOpen, meal, handleClose, handleMealAmountChange, mealAmount, addMealToCart}) {
    let items = meal.itemMeal.map(
        itemMeal => <p key={itemMeal.itemId}>{itemMeal.item.title}</p> 
    );

    return (
        <div>
            <Dialog classes={{paper: theme}} open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{meal.title}</DialogTitle>
                <DialogContent>
                    <img src={meal.image[0].path} alt={meal.title} />
                    {items}
                    <p>{meal.price}</p>
                    <TextField
                        id="filled-number"
                        name="mealAmount"
                        label="Količina"
                        type="number"
                        onChange={() => handleMealAmountChange(event)}
                        value={mealAmount}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Otkaži
                </Button>
                <Button onClick={() => addMealToCart(meal, mealAmount)} color="primary">
                    Dodaj u korpu
                </Button>
                </DialogActions>
            </Dialog> 
        </div>
    )
}

export default MealDialog
