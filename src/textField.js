import React from 'react'
import get from 'lodash/get'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import CheckIcon from '@material-ui/icons/Check'

const getInputProps = ({
  id,
  errors,
  touched,
  endAdornment,
  startAdornment,
  asyncValidation
}) => {
  const inputProps = {}
  if (endAdornment) inputProps.endAdornment = endAdornment
  if (startAdornment) inputProps.startAdornment = startAdornment

  if (asyncValidation && asyncValidation.loading)
    inputProps.endAdornment = <CircularProgress size={25} thickness={7} />

  if (asyncValidation && get(touched, id) && !get(errors, id))
    inputProps.endAdornment = <CheckIcon />
}

export default ({
  type,
  id,
  touched,
  errors,
  values,
  children,
  handleChange,
  handleBlur,
  multi,
  asyncValidation,
  helpText,
  rows,
  disabled,
  startAdornment,
  endAdornment,
  ...props
}) => (
  <TextField
    id={id}
    type={type}
    disabled={disabled}
    value={get(values, id)}
    error={Boolean(get(touched, id) && get(errors, id))}
    helperText={
      Boolean(get(touched, id) && get(errors, id)) ? get(errors, id) : helpText
    }
    variant="outlined"
    fullWidth
    onChange={handleChange}
    onBlur={handleBlur}
    label={children}
    rows={rows}
    multiline={multi}
    InputLabelProps={{
      shrink: type == 'date' ? true : undefined
    }}
    InputProps={getInputProps({
      id,
      errors,
      touched,
      asyncValidation,
      endAdornment,
      startAdornment
    })}
    {...props}
  />
)
