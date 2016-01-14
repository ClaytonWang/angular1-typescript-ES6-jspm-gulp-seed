## Setting up WebStorm 11

WebStorm 11 comes with typescript install. It appears to be updated with the latest version often. 

TypeScript may be configured with a [tsconfig.json](https://github.com/Microsoft/TypeScript/wiki/tsconfig.json) in the root directory of the project. Enable WebStorm to use the
tsconfig.json in the preferences setting.

> **Note:** DO NOT set up watchers. The development environment serves native TypeScript and transpiled in the browser
via SystemJS. Production is transpiled and bundled via gulp tasks.


See Also:
* [Typings options](https://github.com/Microsoft/TypeScript/wiki/Compiler-Options)

![image of webstorm preference]
(images/webstorm-typscript-preferences.png)

Configure WebStorm to use the .jscsrc config:

![image of webstorm preference]
(images/webstorm-set-jscsrc-preferences.png)

Import .jscsrc config:

![image of webstorm preference]
(images/webstorm-import-jscsrc-preferences.png)
