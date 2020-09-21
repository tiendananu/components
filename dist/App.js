"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;

var _react = _interopRequireDefault(require("react"));

var _Container = _interopRequireDefault(require("@material-ui/core/Container"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Box = _interopRequireDefault(require("@material-ui/core/Box"));

var _Link = _interopRequireDefault(require("@material-ui/core/Link"));

var _ProTip = _interopRequireDefault(require("./ProTip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Copyright() {
  return dom(_Typography.default, {
    variant: "body2",
    color: "textSecondary",
    align: "center"
  }, 'Copyright © ', dom(_Link.default, {
    color: "inherit",
    href: "https://material-ui.com/"
  }, "Your Website"), ' ', new Date().getFullYear(), '.');
}

function App() {
  return dom(_Container.default, {
    maxWidth: "sm"
  }, dom(_Box.default, {
    my: 4
  }, dom(_Typography.default, {
    variant: "h4",
    component: "h1",
    gutterBottom: true
  }, "Create React App v4-beta example"), dom(_ProTip.default, null), dom(Copyright, null)));
}