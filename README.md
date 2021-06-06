# currency-convertor

## Notes

* [Open Exchange Rates](https://openexchangerates.org/) is used instead of proposed  https://ratesapi.io/ because of HTTPS support.
* Free plan for API comes with significant limitations on API requests and frequency of updates, so:
    * LocalStorage flag `api_is_mocked` is introduced in order to prevent actual http calls during development
    * Since rates could be updated from API once per hour, they are fetched only once per session
    
### Possible improvements

* Scheduled fetch of available rates in case of their frequent update
* Define formatting rules for specific currencies like BTC, XAU
* Test format behaviour for various locations
* Add translations
* Test accessibility 
* Better design
* Typeahead component for currency selection
* Error states
* Better unit test coverage

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```
