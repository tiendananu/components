import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import config from './config'

const images = {
  google:
    'https://res.cloudinary.com/cloud-polarbear/image/upload/v1601576616/google.svg',
  facebook:
    'https://res.cloudinary.com/cloud-polarbear/image/upload/v1601576616/facebook.svg'
}

export default ({ integration }) => {
  return (
    <Link
      tabIndex={32}
      style={{ margin: 'auto 0' }}
      href={`${config.getModuleUrl('secure')}/auth/${integration}`}
    >
      <IconButton tabIndex={32}>
        <img width="18" height="18" src={images[integration]} />
      </IconButton>
    </Link>
  )
}
