function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var get = _interopDefault(require('lodash/get'));
var TextField = _interopDefault(require('@material-ui/core/TextField'));
var CircularProgress = _interopDefault(require('@material-ui/core/CircularProgress'));
var CheckIcon = _interopDefault(require('@material-ui/icons/Check'));
var FormControlLabel = _interopDefault(require('@material-ui/core/FormControlLabel'));
var Checkbox = _interopDefault(require('@material-ui/core/Checkbox'));
var Select = _interopDefault(require('@material-ui/core/Select'));
var reactI18next = require('react-i18next');
var Chip = _interopDefault(require('@material-ui/core/Chip'));
var Autocomplete = _interopDefault(require('@material-ui/lab/Autocomplete'));
var VisibilityOn = _interopDefault(require('@material-ui/icons/Visibility'));
var VisibilityOff = _interopDefault(require('@material-ui/icons/VisibilityOff'));
var IconButton = _interopDefault(require('@material-ui/core/IconButton'));
var InputAdornment = _interopDefault(require('@material-ui/core/InputAdornment'));
var styles = require('@material-ui/core/styles');
var Typography = _interopDefault(require('@material-ui/core/Typography'));
var Divider = _interopDefault(require('@material-ui/core/Divider'));
var FormControl = _interopDefault(require('@material-ui/core/FormControl'));
var InputLabel = _interopDefault(require('@material-ui/core/InputLabel'));
var Slider = _interopDefault(require('@material-ui/core/Slider'));
var Switch = _interopDefault(require('@material-ui/core/Switch'));
var ToggleButton = _interopDefault(require('@material-ui/lab/ToggleButton'));
var ToggleButtonGroup = _interopDefault(require('@material-ui/lab/ToggleButtonGroup'));

var textField = (function (_ref) {
  var type = _ref.type,
      id = _ref.id,
      touched = _ref.touched,
      errors = _ref.errors,
      values = _ref.values,
      children = _ref.children,
      handleChange = _ref.handleChange,
      handleBlur = _ref.handleBlur,
      multi = _ref.multi,
      asyncValidation = _ref.asyncValidation,
      helpText = _ref.helpText,
      rows = _ref.rows,
      disabled = _ref.disabled;
  return /*#__PURE__*/React.createElement(TextField, {
    id: id,
    type: type,
    disabled: disabled,
    value: get(values, id),
    error: Boolean(get(touched, id) && get(errors, id)),
    helperText: Boolean(get(touched, id) && get(errors, id)) ? get(errors, id) : helpText,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
    onBlur: handleBlur,
    label: children,
    rows: rows,
    multiline: multi,
    InputLabelProps: {
      shrink: type == 'date' ? true : undefined
    },
    InputProps: asyncValidation && {
      endAdornment: asyncValidation.loading ? /*#__PURE__*/React.createElement(CircularProgress, {
        size: 25,
        thickness: 7
      }) : get(touched, id) && !get(errors, id) && /*#__PURE__*/React.createElement(CheckIcon, null)
    }
  });
});

var checkbox = (function (_ref) {
  var id = _ref.id,
      values = _ref.values,
      children = _ref.children,
      handleChange = _ref.handleChange;
  return /*#__PURE__*/React.createElement(FormControlLabel, {
    control: /*#__PURE__*/React.createElement(Checkbox, {
      id: id,
      onChange: handleChange,
      checked: get(values, id),
      color: "primary"
    }),
    label: children
  });
});

var language = (function () {
  var _useTranslation = reactI18next.useTranslation(),
      i18n = _useTranslation.i18n;

  return /*#__PURE__*/React.createElement(Select, {
    "native": true,
    color: "secondary",
    style: {
      border: 'none'
    },
    IconComponent: 'div',
    value: i18n.language,
    onChange: function onChange(e) {
      var language = e.target.value;
      if (i18n.language != language) i18n.changeLanguage(language);
    },
    inputProps: {
      style: {
        padding: '6px 3px 2px 7px',
        border: 'none'
      },
      name: 'language',
      id: 'language'
    }
  }, (i18n.languages || []).map(function (language) {
    return /*#__PURE__*/React.createElement("option", {
      key: language,
      value: language
    }, language.toUpperCase());
  }));
});

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var listField = (function (_ref) {
  var type = _ref.type,
      id = _ref.id,
      touched = _ref.touched,
      errors = _ref.errors,
      values = _ref.values,
      children = _ref.children,
      handleChange = _ref.handleChange,
      handleBlur = _ref.handleBlur,
      multi = _ref.multi;
  return /*#__PURE__*/React.createElement(Autocomplete, {
    multiple: true,
    freeSolo: true,
    id: id,
    onChange: function onChange(e, value) {
      if (!get(values, id).includes(e.target.value)) handleChange({
        target: {
          id: id,
          value: value
        }
      });
    },
    value: get(values, id),
    options: get(values, id),
    onBlur: handleBlur,
    renderTags: function renderTags(value, getTagProps) {
      return get(values, id).map(function (option, index) {
        return /*#__PURE__*/React.createElement(Chip, _extends({
          key: index,
          variant: "outlined",
          label: option
        }, getTagProps({
          index: index
        })));
      });
    },
    renderInput: function renderInput(params) {
      return /*#__PURE__*/React.createElement(TextField, _extends({}, params, {
        type: type,
        error: Boolean(get(touched, id) && get(errors, id)),
        helperText: get(touched, id) && get(errors, id),
        variant: "outlined",
        fullWidth: true,
        label: children,
        multiline: multi
      }));
    }
  });
});

var password = (function (_ref) {
  var type = _ref.type,
      id = _ref.id,
      touched = _ref.touched,
      errors = _ref.errors,
      values = _ref.values,
      children = _ref.children,
      handleChange = _ref.handleChange,
      handleBlur = _ref.handleBlur,
      helpText = _ref.helpText;

  var _React$useState = React.useState(type),
      displayType = _React$useState[0],
      setDisplayType = _React$useState[1];

  return /*#__PURE__*/React.createElement(TextField, {
    id: id,
    type: displayType,
    value: get(values, id),
    error: Boolean(get(touched, id) && get(errors, id)),
    helperText: get(touched, id) && get(errors, id) || helpText,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
    onBlur: handleBlur,
    label: children,
    InputLabelProps: {
      shrink: type == 'date' ? true : undefined
    },
    InputProps: {
      endAdornment: displayType == 'password' ? /*#__PURE__*/React.createElement(IconButton, {
        size: "small",
        tabIndex: 32,
        onClick: function onClick() {
          return setDisplayType('text');
        }
      }, /*#__PURE__*/React.createElement(VisibilityOn, null)) : /*#__PURE__*/React.createElement(IconButton, {
        size: "small",
        tabIndex: 32,
        onClick: function onClick() {
          return setDisplayType('password');
        }
      }, /*#__PURE__*/React.createElement(VisibilityOff, null))
    }
  });
});

var price = (function (_ref) {
  var id = _ref.id,
      touched = _ref.touched,
      errors = _ref.errors,
      values = _ref.values,
      children = _ref.children,
      handleChange = _ref.handleChange,
      handleBlur = _ref.handleBlur,
      helpText = _ref.helpText,
      disabled = _ref.disabled,
      currencyId = _ref.currencyId;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    id: currencyId,
    disabled: true,
    value: get(values, currencyId),
    variant: "outlined",
    onChange: handleChange,
    onBlur: handleBlur,
    label: children
  }), /*#__PURE__*/React.createElement(TextField, {
    id: id,
    fullWidth: true,
    type: "number",
    disabled: disabled,
    value: get(values, id),
    error: Boolean(get(touched, id) && get(errors, id)),
    helperText: get(touched, id) && get(errors, id) || helpText,
    variant: "outlined",
    onChange: handleChange,
    onBlur: handleBlur,
    InputProps: {
      startAdornment: /*#__PURE__*/React.createElement(InputAdornment, {
        position: "start"
      }, "$")
    }
  }));
});

var useStyles = styles.makeStyles(function (theme) {
  return {
    title: {
      paddingLeft: theme.spacing(2)
    },
    container: {
      paddingBottom: theme.spacing(4),
      paddingTop: theme.spacing(2)
    }
  };
});
var section = (function (_ref) {
  var title = _ref.title,
      children = _ref.children,
      _ref$divider = _ref.divider,
      divider = _ref$divider === void 0 ? true : _ref$divider;
  var classes = useStyles();
  return /*#__PURE__*/React.createElement("div", null, divider && /*#__PURE__*/React.createElement(Divider, null), title && /*#__PURE__*/React.createElement(Typography, {
    className: classes.title,
    variant: "overline",
    color: "textSecondary"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: classes.container
  }, children));
});

var select = (function (_ref) {
  var id = _ref.id,
      values = _ref.values,
      children = _ref.children,
      handleChange = _ref.handleChange,
      options = _ref.options;
  var inputLabel = React.useRef(null);
  return /*#__PURE__*/React.createElement(FormControl, {
    fullWidth: true,
    variant: "outlined"
  }, /*#__PURE__*/React.createElement(InputLabel, {
    ref: inputLabel,
    htmlFor: id
  }, children), /*#__PURE__*/React.createElement(Select, {
    fullWidth: true,
    "native": true,
    labelWidth: children ? children.length * 8 : 40,
    value: get(values, id),
    onChange: handleChange,
    inputProps: {
      name: id,
      id: id
    }
  }, (options || []).map(function (_ref2) {
    var name = _ref2.name,
        value = _ref2.value;
    return /*#__PURE__*/React.createElement("option", {
      key: value || 'undefined',
      value: value
    }, name);
  })));
});

var slider = (function (_ref) {
  var id = _ref.id,
      values = _ref.values,
      children = _ref.children,
      handleChange = _ref.handleChange,
      min = _ref.min,
      max = _ref.max,
      sensibility = _ref.sensibility;
  return /*#__PURE__*/React.createElement(FormControl, {
    fullWidth: true,
    size: "small"
  }, /*#__PURE__*/React.createElement(FormControlLabel, {
    style: {
      width: '100%',
      margin: 0
    },
    labelPlacement: "top",
    label: children,
    control: /*#__PURE__*/React.createElement(Slider, {
      id: id,
      name: children,
      valueLabelDisplay: true,
      onChangeCommitted: function onChangeCommitted(e, value) {
        return handleChange({
          target: {
            id: id,
            value: value
          }
        });
      },
      defaultValue: get(values, id),
      getAriaValueText: function getAriaValueText() {
        return get(values, id);
      },
      step: sensibility,
      min: min,
      max: max
    })
  }));
});

var _switch = (function (_ref) {
  var id = _ref.id,
      values = _ref.values,
      children = _ref.children,
      handleChange = _ref.handleChange;
  return /*#__PURE__*/React.createElement(FormControlLabel, {
    control: /*#__PURE__*/React.createElement(Switch, {
      id: id,
      checked: get(values, id),
      onChange: handleChange,
      value: id
    }),
    label: children
  });
});

var toggle = (function (_ref) {
  var id = _ref.id,
      values = _ref.values,
      handleChange = _ref.handleChange,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? [] : _ref$options;
  return /*#__PURE__*/React.createElement(ToggleButtonGroup, {
    value: get(values, id),
    exclusive: true,
    onChange: function onChange(e, value) {
      return handleChange({
        target: {
          id: id,
          value: value
        }
      });
    }
  }, options.map(function (option) {
    return /*#__PURE__*/React.createElement(ToggleButton, {
      key: option.value,
      value: option.value
    }, option.name);
  }));
});

exports.Checkbox = checkbox;
exports.Language = language;
exports.ListField = listField;
exports.Password = password;
exports.Price = price;
exports.Section = section;
exports.Select = select;
exports.Switch = _switch;
exports.TextField = textField;
exports.Toogle = toggle;
exports.slider = slider;
//# sourceMappingURL=index.js.map
