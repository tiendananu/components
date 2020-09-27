import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(theme => ({
  title: {
    paddingLeft: theme.spacing(2)
  },
  container: {
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(2)
  }
}))

export default ({ title, children, divider = true }) => {
  const classes = useStyles()
  return (
    <div>
      {divider && <Divider />}
      {title && (
        <Typography
          className={classes.title}
          variant="overline"
          color="textSecondary"
        >
          {title}
        </Typography>
      )}

      <div className={classes.container}>{children}</div>
    </div>
  )
}
