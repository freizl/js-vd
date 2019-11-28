[![npm version](https://img.shields.io/npm/v/@freizl/jsvd.svg?style=flat-square)](https://www.npmjs.com/package/@freizl/jsvd)

# js-vd

Visualize JavaScript source code dependency as an tree view.
All thanks to

- [madge](https://github.com/pahen/madge)
- [viz.js](https://github.com/mdaines/viz.js/)

## Getting Started

Install the module with: `npm install -g @freizl/jsvd`

## Quick Demo

- ![Demo](./examples/demo.gif)

## Examples

- http://freizl.github.io/apps/js-vd/index.html

Or generate for your own project

- `jsvd -f amd /path/to/project/source > index.html`
- `jsvd -b /path/to/express/project > index.html`
- `jsvd -f amd -d some/module/name -b /path/to/project/source > index.html`

then open the result html

## Options

Type `jsvd --help` or [view the source](https://github.com/freizl/js-vd/blob/master/bin/vd) for the many options like `--exclude` and `--dot`.

## Contributing

- Feel free to submit PR

## TODO

- [x] eslint
- [ ] unit test

## License

- see LICENSE file
