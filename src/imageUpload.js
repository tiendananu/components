import React from 'react'
import get from 'lodash/get'
import Button from '@material-ui/core/Button'
import ImageIcon from '@material-ui/icons/Image'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Delete'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'

const upload = (files, cloudName) =>
  Promise.all(
    files.map((file) => {
      const form = new FormData()
      form.set('file', file)
      form.set('multiple', true)
      form.set('upload_preset', cloudName)
      return axios({
        method: 'post',
        url: `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        data: form,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((res) => res && res.data && res.data.secure_url)
    })
  )

export default ({
  id,
  values,
  children,
  handleChange,
  multi,
  cloudName,
  buttonHeight = 250
}) => {
  const { i18n } = useTranslation()

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
            <Box p={2}>
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
            </Box>
          </Grid>
          {multi && (
            <Grid item xs={9}>
              <Box p={2}>
                <label styles={{ position: 'relative' }} htmlFor={inputId}>
                  <Button
                    color="primary"
                    fullWidth
                    component="span"
                    disabled={loading}
                    endIcon={<AddIcon />}
                  >
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
              </Box>
            </Grid>
          )}
        </Grid>
      ) : (
        <div>
          <label styles={{ position: 'relative' }} htmlFor={inputId}>
            <Button
              fullWidth
              variant="outlined"
              style={{ minHeight: buttonHeight }}
              component="span"
              disabled={loading}
              startIcon={<ImageIcon />}
            >
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
