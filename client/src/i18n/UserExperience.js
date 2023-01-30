/* 
 *  *************************************************
 *   BH [Highly] Confidential
 *   [Unpublished] Copyright 2020.  Baker Hughes
 *  
 *   NOTICE:  All information contained herein is, and remains the property of Baker Hughes, and/or
 *   its affiliates.  The intellectual and technical concepts contained herein are proprietary to Baker Hughes
 *   and/or its affiliates and may be covered by patents, copyrights, and/or trade secrets.  Dissemination of this information or
 *   reproduction of this material is strictly forbidden unless prior written permission is obtained from Baker Hughes.
 *  **************************************************
 */

/**
 * Responsible for instrumenting the user tracking tools. 
 * A product may have more than one tools, hence this will add capability to support multiple tool instrumentation.
 * To add more one can extend by adding specific method xxxInstrumentation()
 */
export class UserExperience {

  trackerScriptId = '.trackerScriptId';

  constructor(trackUserActivity, trackerType, userActivityServer, userActivitySrc, siteId) {
    this.trackUserActivity = trackUserActivity;
    this.trackerType = trackerType;
    this.userActivityServer = userActivityServer;
    this.userActivitySrc = userActivitySrc;
    this.siteId = siteId;
  }

  instrument() {
    if (!this.trackUserActivity) {
      return;
    }

    switch (this.trackerType) {
      case "matomo":
        this.matomoInstrumentation();
        break;
      case "heap":
        this.heapInstrumentation();
        break;
      case "fullstory":
        this.fullStoryInstrumentation();
        break;
      default:
        console.log(`User experience instrumention not available for ${this.trackerType}`);
        break;
    }
  }

  matomoInstrumentation() {
    var u = this.userActivityServer;
    var uSrc = (this.userActivitySrc === undefined || this.userActivitySrc === "") ? u + 'matomo.js' : this.userActivitySrc; // in case of matomo cloud the src is with cdn.
    // _paq.push(['setDomains', 'http://localhost:8000/#/app-builder/*']);
    _paq.push(['setTrackerUrl', u + 'matomo.php']);
    _paq.push(['setSiteId', this.siteId]);
    var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
    g.type = 'text/javascript'; g.async = true; g.src = uSrc; s.parentNode.insertBefore(g, s);
  }

  heapInstrumentation() {
    var u = this.userActivityServer;
    // specific code goes here
    window.heap = window.heap || [], heap.load = function (s, e, t) {
      window.heap.appid = e, window.heap.config = t = t || {};
      var r = document.createElement("script"); r.type = "text/javascript", r.async = !0, r.src = s;
      var a = document.getElementsByTagName("script")[0]; a.parentNode.insertBefore(r, a);
      for (var n = function (e) {
        return function () { heap.push([e].concat(Array.prototype.slice.call(arguments, 0))) }
      }, p = ["addEventProperties", "addUserProperties", "clearEventProperties", "identify", "resetIdentity", "removeEventProperty", "setEventProperties", "track", "unsetEventProperty"], o = 0; o < p.length; o++)heap[p[o]] = n(p[o])
    };
    heap.load(this.userActivitySrc, this.siteId);
  }

  heapInstrumentationPerIFrame(iframeWindow, iframeDocument) {
    if (!this.trackUserActivity || this.doesScriptExists(iframeDocument)) {
      return;
    }
    var u = this.userActivityServer;
    iframeWindow.heap = iframeWindow.heap || [], heap.load = function (s, e, id, t) {
      iframeWindow.heap.appid = e, iframeWindow.heap.config = t = t || {};
      var r = iframeDocument.createElement("script"); r.type = "text/javascript", r.async = !0, r.src = s, r.id = id;
      iframeDocument.head.appendChild(r);
      for (var n = function (e) {
        return function () { heap.push([e].concat(Array.prototype.slice.call(arguments, 0))) }
      }, p = ["addEventProperties", "addUserProperties", "clearEventProperties", "identify", "resetIdentity", "removeEventProperty", "setEventProperties", "track", "unsetEventProperty"], o = 0; o < p.length; o++)heap[p[o]] = n(p[o])
    };
    heap.load(this.userActivitySrc, this.siteId, this.trackerType.concat(this.trackerScriptId));
  }

  fullStoryInstrumentation() {
    // specific code goes here
    window['_fs_host'] = this.userActivityServer;//'fullstory.com';
    window['_fs_script'] = this.userActivitySrc;//'edge.fullstory.com/s/fs.js';
    window['_fs_org'] = this.siteId;
    window['_fs_namespace'] = 'FS';
    //var m = window, n = document, e = window['_fs_namespace'], t = 'script', l = 'user';

    (function (m, n, e, t, l, o, g, y) {
      if (e in m) {
        if (m.console && m.console.log) {
          m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');
        }
        return;
      }
      g = m[e] = function (a, b, s) {
        g.q ? g.q.push([a, b, s]) : g._api(a, b, s);
      };
      g.q = [];
      o = n.createElement(t);
      o.async = 1;
      o.crossOrigin = 'anonymous';
      o.src = 'https://' + _fs_script;
      y = n.getElementsByTagName(t)[0];
      y.parentNode.insertBefore(o, y);
      g.identify = function (i, v, s) {
        g(l, { uid: i }, s);
        if (v)
          g(l, v, s)
      };
      g.setUserVars = function (v, s) {
        g(l, v, s)
      };
      g.event = function (i, v, s) {
        g('event', { n: i, p: v }, s)
      };
      g.anonymize = function () {
        g.identify(!!0)
      };
      g.shutdown = function () {
        g("rec", !1)
      };
      g.restart = function () {
        g("rec", !0)
      };
      g.log = function (a, b) {
        g("log", [a, b])
      };
      g.consent = function (a) {
        g("consent", !arguments.length || a)
      };
      g.identifyAccount = function (i, v) {
        o = 'account';
        v = v || {};
        v.acctId = i;
        g(o, v)
      };
      g.clearUserCookie = function () { };
      g.setVars = function (n, p) {
        g('setVars', [n, p]);
      };
      g._w = {};
      y = 'XMLHttpRequest';
      g._w[y] = m[y];
      y = 'fetch';
      g._w[y] = m[y];
      if (m[y]) m[y] = function () {
        return g._w[y].apply(this, arguments)
      };
      g._v = "1.3.0";
    })(window, document, window['_fs_namespace'], 'script', 'user');
  }

  doesScriptExists(iframeDocument) {
    var scriptElements = iframeDocument.getElementsByTagName("script");
    if (!scriptElements) {
      return false;
    }
    let sid = this.trackerType.concat(this.trackerScriptId);
    for (let index = 0; index < scriptElements.length; index++) {
      if (scriptElements[index].id == sid) {
        return true;
      }
    }
    return false;
  }
}

/**
 * Inject tracking code inside iframe for desired tools.
 * As of now only needed for heap, enable for others as needed
 */
export const InstrumentForIframes = () => {
  const userExperience = window.userExperience;
  if (!userExperience) {
    return;
  }

  const framePos = window.frames;
  for (let i = 0; i < framePos.length; i++) {

    userExperience.map(toolConfig => {
      if (toolConfig.trackerType === 'heap') {
        let toolInstance = new UserExperience(toolConfig.trackUserActivity, toolConfig.trackerType,
          toolConfig.userActivityServer, toolConfig.userActivitySrc, toolConfig.siteId);
        toolInstance.heapInstrumentationPerIFrame(window.frames[i], window.frames[i].document);
      }
    });
  }
}