import React from 'react'

import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import CropIcon from '@mui/icons-material/Crop'

import Crop from 'react-easy-crop'

const ImageCrop = ({
  image,
  open,
  onSubmit = () => {},
  onCancel = () => {}
}) => {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 })
  const [zoom, setZoom] = React.useState(1)
  const [result, setResult] = React.useState()
  return (
    <Dialog
      onClose={() => onSubmit(image)}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth
      maxWidth="md"
    >
      <Box width="100%" height="80vh">
        <Crop
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={(_, result) => setResult(result)}
          onZoomChange={setZoom}
        />
      </Box>
      <Box
        p={2}
        width="100%"
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Box flexGrow={1}>
          <IconButton onClick={() => onSubmit(image)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <IconButton
          onClick={() => {
            onSubmit(
              image.replace(
                /upload\//,
                `upload/c_crop,h_${result.height},w_${result.width},x_${result.x},y_${result.y}/`
              )
            )
          }}
        >
          <CropIcon />
        </IconButton>
      </Box>
    </Dialog>
  )
}

export default ImageCrop
