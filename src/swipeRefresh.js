import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import RefreshIcon from '@material-ui/icons/Refresh'

export default ({ onRefresh = () => {} }) => {
  return (
    <SwipeableDrawer
      disableDiscovery
      disableSwipeToOpen={false}
      variant="temporary"
      SwipeAreaProps={{
        styles: { position: 'absolute', height: 100 }
      }}
      PaperProps={{
        styles: {
          height: '50%',
          background: 'transparent',
          boxShadow: 'none'
        }
      }}
      swipeAreaWidth={80}
      anchor="top"
      onOpen={() => onRefresh()}
      onClose={() => {}}
      open={false}
    >
      <RefreshIcon
        styles={{ color: 'white', height: 50, width: 50, margin: 'auto' }}
      />
    </SwipeableDrawer>
  )
}
