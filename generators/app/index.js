const Generator = require('yeoman-generator')
const toHeader = require('js-headercase')
const toPascal = require('js-pascalcase')

const staticTemplates = [
  '.editorconfig',
  '.gitignore',
  '.nvmrc',
  '.php_cs.dist',
  '.scrutinizer.yml',
  '.travis.yml',
  'package.json',
  'phpunit.xml',
  'src/.gitkeep',
  'tests/.gitkeep'
]

const dynamicTemplates = [
  'CHANGELOG.md',
  'composer.json',
  'LICENSE.txt',
  'README.md'
]

module.exports = class extends Generator {
  async prompting () {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'authorName',
        message: 'Author name',
        store: true
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Author email',
        store: true
      },
      {
        type: 'input',
        name: 'packageName',
        message: 'Package name (e.g. username/packagename)'
      },
      {
        type: 'input',
        name: 'packageDescription',
        message: 'Package description'
      }
    ])
  }

  writing () {
    this._copyFiles()
    this._copyTemplates()
  }

  _copyFiles () {
    staticTemplates.forEach(f => this.fs.copy(
      this.templatePath(f),
      this.destinationPath(f)
    ))
  }

  _copyTemplates () {
    const context = this._templateContext()

    dynamicTemplates.forEach(f => this.fs.copyTpl(
      this.templatePath(f),
      this.destinationPath(f),
      context
    ))
  }

  _templateContext () {
    const autoloadNamespace = this.answers.packageName
      .split('/')
      .map(segment => toPascal(segment))
      .join('\\\\')

    const title = toHeader(this.answers.packageName.split('/')[1])

    return {
      autoloadNamespace,
      title,
      dateStamp: new Date().toISOString().split('T')[0],
      authorName: this.answers.authorName,
      authorEmail: this.answers.authorEmail,
      packageName: this.answers.packageName,
      packageDescription: this.answers.packageDescription
    }
  }
}
