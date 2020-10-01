import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import RefreshIcon from '@material-ui/icons/Refresh'

const useStyles = makeStyles({
  swipeableArea: { position: 'absolute', height: 100 },
  content: {
    height: '50%',
    background: 'transparent',
    boxShadow: 'none'
  },
  refresh: { color: 'white', height: 50, width: 50, margin: 'auto' }
})

export default ({ onRefresh = () => {} }) => {
  const classes = useStyles()

  return (
    <SwipeableDrawer
      disableDiscovery
      disableSwipeToOpen={false}
      variant="temporary"
      SwipeAreaProps={{
        className: classes.swipeableArea
      }}
      PaperProps={{
        className: classes.content
      }}
      swipeAreaWidth={80}
      anchor="top"
      onOpen={() => onRefresh()}
      onClose={() => {}}
      open={false}
    >
      <RefreshIcon className={classes.refresh} />
    </SwipeableDrawer>
  )
}
