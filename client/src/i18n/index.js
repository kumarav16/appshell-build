import i18n from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import _ from "lodash";
import { UserExperience } from './UserExperience';

fetch(`${window.location.pathname}api/tenantConfig`, { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
  .then(response => response.json())
  .then(data => {
    window.i18Resources = data.i18Resources ? data.i18Resources : "";

    instrumentUserExperience(data);

    const options = {
      debug: false,

      lng: window.i18Resources !== "" && window.i18Resources.defaultLang && window.i18Resources.defaultLang !== "" ? window.i18Resources.defaultLang : 'en',


      fallbackLng: window.i18Resources !== "" && window.i18Resources.fallbackLng && window.i18Resources.fallbackLng !== "" ? window.i18Resources.fallbackLng : 'en',

      ns: window.i18Resources !== "" && window.i18Resources.ns && window.i18Resources.ns.length > 0 ? window.i18Resources.ns : ['message'],
      defaultNS: window.i18Resources !== "" && window.i18Resources.ns && window.i18Resources.ns.length > 0 ? window.i18Resources.ns[0] : 'message',
      backend: {
        loadPath: `${window.location.pathname}i18Resources/appshell/{{lng}}/{{ns}}.json`
      },
      react: {
        bindI18n: 'languageChanged loaded',
        bindStore: 'added removed',
        nsMode: 'default',
      },
    };
    i18n
      .use(HttpApi)
      // .use(LanguageDetector)
      .init(options);
    // .changeLanguage('en', (err, t) => {
    //   if (err) return console.log('something went wrong loading', err);
    // });
  }
  );

/**
 * Reads the userExperience configuration and performs instrumentation of each tool specified in it.
 * @param {*} data 
 * @returns 
 */
function instrumentUserExperience(data) {
  if (data.userExperience === undefined || _.isEmpty(data.userExperience)) {
    return;
  }

  data.userExperience.map(toolConfig => {
    let toolInstance = new UserExperience(toolConfig.trackUserActivity, toolConfig.trackerType, 
      toolConfig.userActivityServer, toolConfig.userActivitySrc, toolConfig.siteId);
    toolInstance.instrument();
  });
  // maintain this state, to make it avialable for iframe instrumentation
  window.userExperience = data.userExperience ? data.userExperience : undefined;
}

export default i18n;