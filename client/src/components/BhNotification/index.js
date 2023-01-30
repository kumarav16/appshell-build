import { applyPolyfills, defineCustomElements } from '@baker-hughes-central-design/ui-toolkit/loader';
import './BhNotification.css'


applyPolyfills().then(() => {
    defineCustomElements();
  });

export { default } from './BhNotification';