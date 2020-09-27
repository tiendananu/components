import React from 'react'
import get from 'lodash/get'
import TextField from '@material-ui/core/TextField'
import VisibilityOn from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'

export default ({
  type,
  id,
  touched,
  errors,
  values,
  children,
  handleChange,
  handleBlur,
  helpText
}) => {
  const [displayType, setDisplayType] = React.useState(type)

  return (
    <TextField
      id={id}
      type={displayType}
      value={get(values, id)}
      error={Boolean(get(touched, id) && get(errors, id))}
      helperText={(get(touched, id) && get(errors, id)) || helpText}
      variant="outlined"
      fullWidth
      onChange={handleChange}
      onBlur={handleBlur}
      label={children}
      InputLabelProps={{
        shrink: type == 'date' ? true : undefined
      }}
      InputProps={{
        endAdornment:
          displayType == 'password' ? (
            <IconButton
              size="small"
              tabIndex={32}
              onClick={() => setDisplayType('text')}
            >
              <VisibilityOn />
            </IconButton>
          ) : (
            <IconButton
              size="small"
              tabIndex={32}
              onClick={() => setDisplayType('password')}
            >
              <VisibilityOff />
            </IconButton>
          )
      }}
    />
  )
}
