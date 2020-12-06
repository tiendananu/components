import React from 'react'
import get from 'lodash/get'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'

const useStyles = makeStyles((theme) => ({
  currency: {
    '& > fieldset': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderRight: 'none'
    }
  },
  price: {
    '& > fieldset': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderLeft: 'none'
    }
  },
  input: {
    textAlign: 'right'
  }
}))
export default ({
  id,
  touched,
  errors,
  values,
  children,
  handleChange,
  handleBlur,
  helpText,
  disabled,
  currencyId
}) => {
  const classes = useStyles()
  return (
    <div style={{ display: 'flex' }}>
      <TextField
        id={currencyId}
        disabled
        value={get(values, currencyId)}
        variant="outlined"
        onChange={handleChange}
        onBlur={handleBlur}
        label={children}
        inputProps={{ className: classes.input }}
        InputProps={{
          className: classes.currency
        }}
      />
      <TextField
        id={id}
        fullWidth
        type="number"
        disabled={disabled}
        value={get(values, id)}
        error={Boolean(get(touched, id) && get(errors, id))}
        helperText={(get(touched, id) && get(errors, id)) || helpText}
        variant="outlined"
        onChange={handleChange}
        onBlur={handleBlur}
        InputProps={{
          className: classes.price
        }}
      />
    </div>
  )
}
