import React from 'react'
import get from 'lodash/get'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'

export default ({ id, values, children, handleChange, options }) => {
  const inputLabel = React.useRef(null)

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel shrink={true} ref={inputLabel} htmlFor={id}>
        {children}
      </InputLabel>
      <Select
        fullWidth
        native
        labelWidth={children ? children.length * 8 : 40}
        value={get(values, id)}
        onChange={handleChange}
        inputProps={{
          name: id,
          id
        }}
      >
        {(options || []).map(({ name, value }) => (
          <option key={value || 'undefined'} value={value}>
            {name}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}
