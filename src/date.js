import React from 'react'

import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'

import get from 'lodash/get'

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
  format = 'MM/dd/yyyy',
  ...props
}) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      disableToolbar
      fullWidth
      onChange={handleChange}
      onBlur={handleBlur}
      label={children}
      variant="inline"
      format={format}
      margin="normal"
      id={id}
      disabled={disabled}
      value={get(values, id)}
      error={Boolean(get(touched, id) && get(errors, id))}
      helperText={
        Boolean(get(touched, id) && get(errors, id))
          ? get(errors, id)
          : helpText
      }
      KeyboardButtonProps={{
        'aria-label': 'change date'
      }}
      {...props}
    />
  </MuiPickersUtilsProvider>
)
