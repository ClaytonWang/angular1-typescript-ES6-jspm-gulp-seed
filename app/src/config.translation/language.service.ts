'use strict';

class LanguageService {
  public localeIdMap = {

    /* German/Deutsch */
    // 'de'	: 'de',
    // 'de-at' : 'de',
    // 'de-de'	: 'de',
    // 'de-li'	: 'de',
    // 'de-lu'	: 'de',
    // 'de-ch'	: 'de',

    /* English */
    'en': 'en-us',
    // 'en-gb'	: 'en-gb',
    'en-us': 'en-us'

    /* French */
    // 'fr'	: 'fr-fr',
    // 'fr-fr'	: 'fr-fr',
    // 'fr-be' : 'fr-fr',
    // 'fr-ca' : 'fr-fr',
    // 'fr-lu' : 'fr-fr',
    // 'fr-ch' : 'fr-fr',

    /* Italian */
    // 'it'	: 'it',
    // 'it-it' : 'it',
    // 'it-ch' : 'it'
  };

  public $locale: any;

  static serviceFactory($locale: any) {
    return new LanguageService($locale);
  }

  constructor($locale) {
    this.$locale = $locale;
  }

  getLanguageCode() {

    let localeId = this.$locale.id;

    // Default to en
    return (localeId && this.localeIdMap[localeId.toLowerCase()]) ?
               this.localeIdMap[localeId.toLowerCase()] :
               this.localeIdMap.en;
  }

}

export {LanguageService}
