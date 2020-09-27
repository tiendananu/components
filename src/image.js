import React from 'react'
import get from 'lodash/get'
import Button from '@material-ui/core/Button'
import ImageIcon from '@material-ui/icons/Image'
import AddIcon from '@material-ui/icons/Add'

import RemoveIcon from '@material-ui/icons/Delete'
import fetch from 'isomorphic-unfetch'
import CircularProgress from '@material-ui/core/CircularProgress'
import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { useTranslation } from 'react-i18next'

import config from '../config'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  wrapper: {
    position: 'relative'
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  },

  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}))

const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${config.get(
  'core.cloudinary.cloud_name'
)}/upload`
const upload = (files) =>
  Promise.all(
    files.map((file) => {
      const form = new FormData()
      form.set('file', file)
      form.set('multiple', true)
      form.set('upload_preset', config.get('core.cloudinary.cloud_name'))

      return fetch(cloudinaryUrl, {
        method: 'POST',
        body: form
      })
        .then((res) => res.json())
        .then((res) => res.secure_url)
    })
  )

export default ({ id, values, children, handleChange, multi }) => {
  const [loading, setLoading] = React.useState()
  const classes = useStyles()
  const { t } = useTranslation()

  const hasValue =
    (multi && get(values, `${id}.length`)) || (!multi && get(values, id))
  return (
    <>
      <input
        style={{ display: 'none' }}
        accept="image/*"
        name={children}
        id={loading ? '' : 'inputfile'}
        type="file"
        multiple={multi}
        onChange={async ({ target: { files } }) => {
          setLoading(true)
          const uploadedFiles = await upload(Array.from(files))
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
              {t('Delete')}
            </Button>
          </Grid>
          {multi && (
            <Grid item xs={9}>
              <label className={classes.wrapper} htmlFor="inputfile">
                <Button
                  color="secondary"
                  fullWidth
                  component="span"
                  disabled={loading}
                >
                  <AddIcon />
                  {t('Add other')}
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </label>
            </Grid>
          )}
        </Grid>
      ) : (
        <div>
          <label className={classes.wrapper} htmlFor="inputfile">
            <Button
              fullWidth
              variant="outlined"
              style={{ minHeight: 250 }}
              component="span"
              disabled={loading}
            >
              <ImageIcon />
              {t('Add an image')}
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </label>
        </div>
      )}
    </>
  )
}
