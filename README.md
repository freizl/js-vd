[![NPM](https://nodei.co/npm/js-vd.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/js-vd/)
[![NPM](https://nodei.co/npm-dl/js-vd.png?height=3)](https://nodei.co/npm/js-vd/)

# js-vd

Visualize JavaScript source code dependency as an tree view. 
All thanks to

- [madge](https://github.com/pahen/madge)
- [viz.js](https://github.com/mdaines/viz.js/)

## Getting Started
Install the module with: `npm install -g js-vd`

## Examples
- http://freizl.github.io/ftp/js-vd/index.html

Or generate for your own project

- `vd -f amd /path/to/project/source > index.html`
- `vd /path/to/express/project > index.html`
- `vd -f amd -d some/module/name /path/to/project/source > index.html`

then open the result html

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License
Copyright (c) 2015 Haisheng.Wu
Licensed under the MIT license.
