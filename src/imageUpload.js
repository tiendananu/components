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

import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Carousel from 'react-material-ui-carousel'

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
  onChange = () => {}
}) => {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 })
  const [zoom, setZoom] = React.useState(1)
  const [result, setResult] = React.useState()
  const [cropping, setCropping] = React.useState()

  return (
    <Box width="100%" height="80vh" display="flex" alignItems="flex-end">
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
        <img
          style={{
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
          height="100%"
          src={image}
        />
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

  const hasValue =
    (multi && get(values, `${id}.length`)) || (!multi && get(values, id))

  let images = values[id] || []
  if (!images instanceof Array) images = [images]

  return (
    <Box width={fullWidth ? '100%' : 'auto'}>
      {preview && hasValue && (
        <Carousel
          indicators={false}
          cycleNavigation={false}
          navButtonsAlwaysInvisible={Boolean(images.length <= 1)}
          autoPlay={false}
        >
          {images.map((src, i) => (
            <Box
              key={src}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <ImageEdit
                image={src}
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
          ))}
        </Carousel>
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
        <Box display="flex">
          <Box py={2} display="flex" flexGrow={1}>
            {images.map((image) => (
              <Box pr={2}>
                <Avatar variant="rounded" src={image}></Avatar>
              </Box>
            ))}
            <Box display="flex" justifyContent="center" alignItems="center">
              <Avatar variant="rounded">
                <label htmlFor={inputId}>
                  <IconButton
                    component="span"
                    color="primary"
                    disabled={loading}
                  >
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
