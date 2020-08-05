import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function ThemeSwitch({handleThemeSwitch}) {
    return (
        <FormControlLabel
            control={
                <Switch
                    // checked={isDark}
                    onChange={handleThemeSwitch}
                    name="theme"
                    color="primary"
                />
            }
            label="Dark theme"
        />
    )
}

export default ThemeSwitch
