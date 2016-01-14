languageToUse.$inject = ['$translate', 'language'];
function languageToUse($translate, language) {
  'use strict';
  $translate.use(language.getLanguageCode());
}

export {languageToUse};
