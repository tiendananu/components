import React from 'react'
import Select from '@material-ui/core/Select'

export default ({ i18n }) => (
  <Select
    native
    color="secondary"
    style={{ border: 'none' }}
    IconComponent={'div'}
    value={i18n.language}
    onChange={(e) => {
      const language = e.target.value
      if (i18n.language != language) i18n.changeLanguage(language)
    }}
    inputProps={{
      style: { padding: '6px 3px 2px 7px', border: 'none' },
      name: 'language',
      id: 'language'
    }}
  >
    {(i18n.options.whitelist || [])
      .filter((language) => language !== 'cimode')
      .map((language) => (
        <option key={language} value={language}>
          {language.toUpperCase()}
        </option>
      ))}
  </Select>
)
