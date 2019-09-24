const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
  }

  first() {
    this.log('FIRST!')
  }

  second() {
    this.log('Sad womp')
  }
}
