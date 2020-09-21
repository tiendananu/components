"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ProTip;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _Link = _interopRequireDefault(require("@material-ui/core/Link"));

var _SvgIcon = _interopRequireDefault(require("@material-ui/core/SvgIcon"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LightBulbIcon(props) {
  return dom(_SvgIcon.default, props, dom("path", {
    d: "M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"
  }));
}

const useStyles = (0, _styles.makeStyles)(theme => ({
  root: {
    margin: theme.spacing(6, 0, 3)
  },
  lightBulb: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1)
  }
}));

function ProTip() {
  const classes = useStyles();
  return dom(_Typography.default, {
    className: classes.root,
    color: "textSecondary"
  }, dom(LightBulbIcon, {
    className: classes.lightBulb
  }), "Pro tip: See more", ' ', dom(_Link.default, {
    href: "https://material-ui.com/getting-started/templates/"
  }, "templates"), " on the Material-UI documentation.");
}