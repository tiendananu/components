import React from 'react'
import get from 'lodash/get'
import Button from '@material-ui/core/Button'
import ImageIcon from '@material-ui/icons/Image'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Delete'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'

// config.get('core.cloudinary.cloud_name')
const upload = (files, cloudName) =>
  Promise.all(
    files.map((file) => {
      const form = new FormData()
      form.set('file', file)
      form.set('multiple', true)
      form.set('upload_preset', cloudName)

      return import('isomorphic-unfetch')(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        {
          method: 'POST',
          body: form
        }
      )
        .then((res) => res.json())
        .then((res) => res.secure_url)
    })
  )

export default ({
  id,
  values,
  children,
  handleChange,
  multi,
  cloudName,
  i18n
}) => {
  const [loading, setLoading] = React.useState()
  const inputId = `inputfile-${id}`
  const hasValue =
    (multi && get(values, `${id}.length`)) || (!multi && get(values, id))
  return (
    <React.Fragment>
      <input
        style={{ display: 'none' }}
        accept="image/*"
        name={children}
        id={loading ? '' : inputId}
        type="file"
        multiple={multi}
        onChange={async ({ target: { files } }) => {
          setLoading(true)
          const uploadedFiles = await upload(Array.from(files), cloudName)
          const currentValue = values[id] || []
          let value =
            multi && currentValue instanceof Array
              ? currentValue.concat(uploadedFiles)
              : uploadedFiles[0]

          handleChange({
            target: { id, value }
          })
          setLoading(false)
        }}
      />
      {hasValue ? (
        <Grid container>
          <Grid item xs={multi ? 3 : 12}>
            <Button
              color="default"
              fullWidth
              component="span"
              onClick={() =>
                handleChange({ target: { id, value: multi ? [] : null } })
              }
            >
              <RemoveIcon />
              {i18n.t('Delete')}
            </Button>
          </Grid>
          {multi && (
            <Grid item xs={9}>
              <label styles={{ position: 'relative' }} htmlFor={inputId}>
                <Button
                  color="secondary"
                  fullWidth
                  component="span"
                  disabled={loading}
                >
                  <AddIcon />
                  {i18n.t('Add other')}
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    styles={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: -12,
                      marginLeft: -12
                    }}
                  />
                )}
              </label>
            </Grid>
          )}
        </Grid>
      ) : (
        <div>
          <label styles={{ position: 'relative' }} htmlFor={inputId}>
            <Button
              fullWidth
              variant="outlined"
              style={{ minHeight: 250 }}
              component="span"
              disabled={loading}
            >
              <ImageIcon />
              {i18n.t('Add an image')}
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                styles={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: -12,
                  marginLeft: -12
                }}
              />
            )}
          </label>
        </div>
      )}
    </React.Fragment>
  )
}
