import React from 'react'
import get from 'lodash/get'
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip'
import Autocomplete from '@material-ui/lab/Autocomplete'

export default ({
  type,
  id,
  touched,
  errors,
  values,
  children,
  handleChange = () => {},
  handleBlur = () => {},
  multi
}) => (
  <Autocomplete
    multiple
    freeSolo
    id={id}
    onChange={(e, value) => {
      if (!get(values, id).includes(e.target.value))
        handleChange({ target: { id, value } })
    }}
    value={get(values, id)}
    options={get(values, id)}
    onBlur={handleBlur}
    renderTags={(value, getTagProps) =>
      get(values, id).map((option, index) => (
        <Chip
          key={index}
          variant="outlined"
          label={option}
          {...getTagProps({ index })}
        />
      ))
    }
    renderInput={(params) => (
      <TextField
        {...params}
        type={type}
        error={Boolean(get(touched, id) && get(errors, id))}
        helperText={get(touched, id) && get(errors, id)}
        variant="outlined"
        fullWidth
        label={children}
        multiline={multi}
      />
    )}
  />
)
