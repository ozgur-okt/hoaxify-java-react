import React from 'react'
import { useTranslation } from 'react-i18next'

function LanguageSelector() {
  const { i18n } = useTranslation()
  const onSelectLanguage = (language) => {
    i18n.changeLanguage(language)
    localStorage.setItem('hoax-language', language)
  }

  return (
    <>
      <img
        role='button'
        src="https://flagcdn.com/16x12/tr.png"
        width="40"
        height="30"
        alt="Turkish"
        onClick={() => onSelectLanguage('tr')}
      ></img>
      <img
        role='button'
        src="https://flagcdn.com/16x12/us.png"
        width="30"
        height="30"
        alt="English"
        onClick={() => onSelectLanguage('en')}
      ></img>
    </>
  )
}

export default LanguageSelector
