import { applyPolyfills, defineCustomElements } from '@baker-hughes-central-design/ui-toolkit/loader';
import './GlobalSearch.css';

applyPolyfills().then(() => {
    defineCustomElements();
  });
  

export { default } from './GlobalSearch';