/* eslint-env mocha */
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const path = require('path')

describe('laravel-package:app', async function () {
  before(async function () {
    await helpers.run(path.join(__dirname, '../../generators/app'))
      .withPrompts({
        authorName: 'John Doe',
        authorEmail: 'john@doe.com',
        packageName: 'john-doe/yeoman-package',
        packageDescription: 'A test package'
      })
  })

  it('copies the standard files', async function () {
    assert.file([
      '.editorconfig',
      '.gitignore',
      '.nvmrc',
      '.php_cs.dist',
      '.scrutinizer.yml',
      '.travis.yml',
      'package.json',
      'phpunit.xml'
    ])
  })

  it('creates CHANGELOG.md', async function () {
    const filename = 'CHANGELOG.md'
    const ymd = new Date().toISOString().split('T')[0]

    assert.file(filename)
    assert.fileContent(filename, `## [1.0.0] - ${ymd}`)
  })

  it('creates composer.json', async function () {
    const filename = 'composer.json'

    assert.file(filename)
    assert.fileContent(filename, '"name": "john-doe/yeoman-package"')
    assert.fileContent(filename, '"description": "A test package"')
    assert.fileContent(filename, '"homepage": "https://github.com/john-doe/yeoman-package"')
    assert.fileContent(filename, '"issues": "https://github.com/john-doe/yeoman-package/issues"')
    assert.fileContent(filename, '"source": "https://github.com/john-doe/yeoman-package"')
    assert.fileContent(filename, '"name": "John Doe"')
    assert.fileContent(filename, '"email": "john@doe.com"')
    assert.fileContent(filename, '"JohnDoe\\\\YeomanPackage\\\\": "src/"')
    assert.fileContent(filename, '"JohnDoe\\\\YeomanPackage\\\\Tests\\\\": "tests/"')
  })

  it('creates LICENSE.txt', async function () {
    const filename = 'LICENSE.txt'
    const year = new Date().getUTCFullYear()

    assert.file(filename)
    assert.fileContent(filename, `Copyright (c) ${year} John Doe`)
  })

  it('creates README.md', async function () {
    const filename = 'README.md'

    assert.file(filename)
    assert.fileContent(filename, '# Yeoman Package')
    assert.fileContent(filename, '## About Yeoman Package')
    assert.fileContent(filename, 'Yeoman Package requires ...')
    assert.fileContent(filename, 'Install Yeoman Package using')
    assert.fileContent(filename, 'composer require john-doe/yeoman-package')
    assert.fileContent(filename, 'Yeoman Package is open source software')
    assert.fileContent(filename, '[the MIT license](https://github.com/john-doe/yeoman-package/blob/master/LICENSE.txt')

    assert.fileContent(filename, '<a href="https://travis-ci.org/john-doe/yeoman-package"><img src="https://img.shields.io/travis/john-doe/yeoman-package/master.svg" alt="Build Status"/></a>')
    assert.fileContent(filename, '<a href="https://scrutinizer-ci.com/g/john-doe/yeoman-package"><img src="https://img.shields.io/scrutinizer/g/john-doe/yeoman-package.svg" alt="Quality Score"/></a>')
    assert.fileContent(filename, '<a href="https://scrutinizer-ci.com/g/john-doe/yeoman-package"><img src="https://img.shields.io/scrutinizer/coverage/g/john-doe/yeoman-package.svg" alt="Coverage"/></a>')
    assert.fileContent(filename, '<a href="https://packagist.org/packages/john-doe/yeoman-package"><img src="https://poser.pugx.org/john-doe/yeoman-package/v/stable.svg" alt="Latest Stable Version"/></a>')
    assert.fileContent(filename, '<a href="https://packagist.org/packages/john-doe/yeoman-package"><img src="https://poser.pugx.org/john-doe/yeoman-package/license.svg" alt="License"/></a>')
  })

  it('creates the src directory', async function () {
    assert.file('src/.gitkeep')
  })

  it('creates the tests directory', async function () {
    assert.file('tests/.gitkeep')
  })
})
