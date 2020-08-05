import React from 'react';

import Button from 'react-bootstrap/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';


import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { faDrumstickBite, faAllergies } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import '../styles/theme.scss';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));

function ItemDialog({ theme, portion, isOpen, item, portionName, ingredientCheckboxes, handleIngredientCheck, handlePortionChange, handleClose, handleChange, addItemToCart, personalPreference, allergens, amount }) {
    let portionMenuItems = item.portions.map(
        portion => <MenuItem key={portion.id} value={portion.title}>{portion.title}</MenuItem>
    );
    
    const classes = useStyles();

    let checkboxList =  ingredientCheckboxes.map((ingredient, index) =>
                            <FormControlLabel
                                key={ingredient.id}
                                control={
                                    <Checkbox checked={ingredient.isChecked} onChange={() => handleIngredientCheck(event, index)}></Checkbox>
                                } 
                                label={ingredient.title}
                            >
                            </FormControlLabel> 
                        )
    let allergenList = allergens.map((allergen, index) => <p key={index}>{allergen}</p>)
    return (
        <div>
            {/* theme can be dark or light, imported from theme.scss */}
            <Dialog classes={{paper: theme}} open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{item.title}</DialogTitle>
                <DialogContent>
                    {/* <img src={item.image[0].path} alt={meal.title} /> */}
                    {/* {items} */}
                    <FontAwesomeIcon icon={faDrumstickBite} size="6x"/>
                    <p>{portionName !== '' ? portion.price : 0}</p>
                    <p>{portionName !== '' ? portion.calorieCount : 0}</p>
                    <p>{portionName !== '' ? portion.mass : 0}</p>
                    <div className="allergens">
                        <FontAwesomeIcon icon={faAllergies} size="3x" />
                        {allergenList}
                    </div>
                    {checkboxList}
                    <TextField
                        id="outlined-multiline-flexible"
                        name="personalPreference"
                        label="Dodatna uputstva"
                        multiline
                        rowsMax={4}
                        value={personalPreference}
                        onChange={() => handleChange(event)}
                        variant="outlined"
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="portion-select">Porcija</InputLabel>
                        <Select
                            labelId="portion-select"
                            id="portion-select"
                            name="portionName"
                            value={portionName}
                            onChange={(event) => handlePortionChange(event, item)}
                        >
                            {portionMenuItems}
                        </Select>
                    </FormControl>
                    <TextField
                        id="filled-number"
                        name="amount"
                        label="Količina"
                        type="number"
                        onChange={() => handleChange(event)}
                        value={amount}
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
                <Button onClick={() => addItemToCart(item.id, item.title, portion, amount, personalPreference)} color="primary">
                    Dodaj u korpu
                </Button>
                </DialogActions>
            </Dialog> 
        </div>
    )
}

export default ItemDialog