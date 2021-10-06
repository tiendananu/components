import React from 'react'
import get from 'lodash/get'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import ImageIcon from '@material-ui/icons/Image'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Delete'
import CropIcon from '@material-ui/icons/Crop'
import CloseIcon from '@material-ui/icons/Close'
import DoneIcon from '@material-ui/icons/Done'
import Crop from 'react-easy-crop'
import ResetIcon from '@material-ui/icons/Refresh'

import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'

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

const ImageEdit = ({
  cropConfig,
  image,
  onRemove = () => {},
  onChange = () => {},
  onReset = () => {}
}) => {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 })
  const [zoom, setZoom] = React.useState(1)
  const [result, setResult] = React.useState()
  const [cropping, setCropping] = React.useState()

  return (
    <Box
      width="100%"
      maxHeight="80vh"
      height="100%"
      display="flex"
      alignItems="flex-end"
      justifyContent="center"
    >
      {Boolean(cropConfig && cropping) ? (
        <Crop
          image={image}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onCropComplete={(_, result) => setResult(result)}
          onZoomChange={setZoom}
          {...cropConfig}
        />
      ) : (
        <Box
          display="flex"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          <img
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              maxHeight: '80vh'
            }}
            width="100%"
            height="auto"
            src={image}
          />
        </Box>
      )}
      <Box
        p={2}
        width="100%"
        position="absolute"
        display="flex"
        justifyContent="center"
        alignItems="flex-end"
      >
        {!cropping && (
          <React.Fragment>
            <IconButton onClick={() => onRemove()}>
              <RemoveIcon />
            </IconButton>
            {cropConfig && (
              <IconButton onClick={() => setCropping(true)}>
                <CropIcon />
              </IconButton>
            )}
            {cropConfig && (
              <IconButton onClick={() => onReset()}>
                <ResetIcon />
              </IconButton>
            )}
          </React.Fragment>
        )}
        {cropping && (
          <React.Fragment>
            <Box p={2}>
              <IconButton onClick={() => setCropping()}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box p={2}>
              <IconButton
                onClick={() => {
                  setCropping()
                  onChange(result)
                }}
              >
                <DoneIcon />
              </IconButton>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Box>
  )
}

const ImageUpload = ({
  id,
  fullWidth,
  values,
  handleChange,
  multi,
  cloudName,
  buttonHeight = 250,
  buttonText,
  preview,
  crop
}) => {
  const inputId = `inputfile-${id}`
  const [loading, setLoading] = React.useState()
  const [nav, setNav] = React.useState(0)

  const hasValue =
    (multi && get(values, `${id}.length`)) || (!multi && get(values, id))

  let images = get(values, id) || []
  if (!(images instanceof Array)) images = [images]

  return (
    <Box width={fullWidth ? '100%' : 'auto'}>
      {preview && hasValue && (
        <Box height="80vh" width="100%" position="relative">
          {images.map((src, i) => (
            <Fade key={src} in={nav == i} unmountOnExit mountOnEnter>
              <Box
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                style={{ background: '#222' }}
              >
                <ImageEdit
                  image={src}
                  onReset={() => {
                    images[i] = src.replace(/upload\/c_crop,.*\//, 'upload/')

                    handleChange({
                      target: { id, value: multi ? images : images[0] }
                    })
                  }}
                  onChange={(cropResult) => {
                    images[i] = src.replace(
                      /upload\//,
                      `upload/c_crop,h_${cropResult.height},w_${cropResult.width},x_${cropResult.x},y_${cropResult.y}/`
                    )

                    handleChange({
                      target: { id, value: multi ? images : images[0] }
                    })
                  }}
                  onRemove={() => {
                    images.splice(i, 1)
                    handleChange({
                      target: { id, value: multi ? images : images[0] }
                    })
                  }}
                  cropConfig={crop}
                />
              </Box>
            </Fade>
          ))}
        </Box>
      )}
      <input
        style={{ display: 'none' }}
        accept="image/*"
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
        Boolean(multi) && (
          <Box display="flex">
            <Box py={2} display="flex" flexGrow={1}>
              {images.map((image, i) => (
                <Box key={image} pr={2}>
                  <Avatar variant="rounded">
                    <IconButton onClick={() => setNav(i)}>
                      <Avatar variant="rounded" src={image} />
                    </IconButton>
                  </Avatar>
                </Box>
              ))}
              <Box display="flex" justifyContent="center" alignItems="center">
                <Avatar variant="rounded">
                  <label htmlFor={inputId}>
                    <IconButton component="span" disabled={loading}>
                      <AddIcon />
                    </IconButton>
                  </label>
                </Avatar>
                {loading && (
                  <Box
                    display="flex"
                    position="absolute"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <CircularProgress thickness={6} size={24} />
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        )
      ) : (
        <div>
          <label htmlFor={inputId}>
            <Box
              width="100%"
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                fullWidth
                variant="outlined"
                style={{ minHeight: buttonHeight }}
                component="span"
                disabled={loading}
                startIcon={<ImageIcon />}
              >
                {buttonText || 'Add an image'}
              </Button>
              {loading && (
                <Box
                  display="flex"
                  position="absolute"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CircularProgress thickness={6} size={48} />
                </Box>
              )}
            </Box>
          </label>
        </div>
      )}
    </Box>
  )
}
export default ImageUpload
