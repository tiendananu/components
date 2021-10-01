import React from 'react'
import {
  Checkbox,
  Color,
  ListField,
  Toggle,
  TextField,
  ImageUpload,
  ImageCrop,
  Carousel
} from 'components'

export const CheckboxStory = () => {
  const [values, setValues] = React.useState()
  return (
    <Checkbox
      id="id"
      values={values}
      handleChange={(e) =>
        setValues((values) => ({ ...values, id: e.target.checked }))
      }
    >
      Label
    </Checkbox>
  )
}

export const ColorStory = () => {
  const [values, setValues] = React.useState()
  return (
    <Color
      id="id"
      values={values}
      handleChange={(e) =>
        setValues((values) => ({ ...values, id: e.target.value }))
      }
    >
      Label
    </Color>
  )
}

export const ListFieldStory = () => {
  const [values, setValues] = React.useState({ id: [] })
  return (
    <ListField
      id="id"
      values={values}
      touched={{}}
      error={{}}
      handleChange={(e) =>
        setValues((values) => ({ ...values, id: e.target.value }))
      }
    >
      Label
    </ListField>
  )
}

export const ToggleStory = () => {
  const [values, setValues] = React.useState()
  return (
    <Toggle
      id="id"
      values={values}
      handleChange={(e) =>
        setValues((values) => ({ ...values, id: e.target.value }))
      }
      options={[
        { value: 1, name: 'Option1' },
        { value: 2, name: 'Option2' },
        { value: 3, name: 'Option3' }
      ]}
    >
      Label
    </Toggle>
  )
}

export const TextFieldStory = () => {
  const [values, setValues] = React.useState()
  return (
    <TextField
      id="id"
      values={values}
      handleChange={(_, value) =>
        setValues((values) => ({ ...values, id: value }))
      }
    >
      Label
    </TextField>
  )
}

export const ImageUploadStory = () => {
  const [values, setValues] = React.useState({
    id: [
      'https://res.cloudinary.com/dfeyswrng/image/upload/v1631224045/fhi5bd56i565viwdj523.webp',
      'https://res.cloudinary.com/dfeyswrng/image/upload/v1631224045/fhi5bd56i565viwdj523.webp'
    ]
  })
  return (
    <ImageUpload
      fullWidth
      values={values}
      cloudName="dfeyswrng"
      id="id"
      preview
      multi
      crop={{ aspect: 4 / 3 }}
      handleChange={(e) =>
        setValues((values) => ({ ...values, id: e.target.value }))
      }
    />
  )
}

export const ImageCropStory = () => {
  return (
    <ImageCrop
      open
      image={
        'https://res.cloudinary.com/dfeyswrng/image/upload/v1631224045/fhi5bd56i565viwdj523.webp'
      }
    />
  )
}

export const ImageUploadCroppingStory = () => {
  const [image, setImage] = React.useState()
  return (
    <>
      {image && <Carousel images={[image]} />}
      <ImageUpload
        crop
        multi
        values={{}}
        cloudName="dfeyswrng"
        id="id"
        type="image"
        handleChange={(e) => setImage(e.target.value)}
      />
    </>
  )
}
