"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _colors = require("@material-ui/core/colors");

var _styles = require("@material-ui/core/styles");

// A custom theme for this app
const theme = (0, _styles.createMuiTheme)({
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: _colors.red.A400
    },
    background: {
      default: '#fff'
    }
  }
});
var _default = theme;
exports.default = _default;