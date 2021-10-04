const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const globby = require('globby')
const chalk = require('chalk')

const renameFiles = {
  _gitignore: '.gitignore'
}

module.exports = {
  init: async (root, template, options) => {
    console.log(`\nScaffolding project in ${root}...`)
    const templateDir = path.join(__dirname, `template-${template}`)
    const { jiraIssueKey } = options
    const write =  (root, file, content) => {
      const targetPath = renameFiles[file]
        ? path.join(root, renameFiles[file])
        : path.join(root, file)
      if (content) {
        fs.mkdirSync(path.dirname(targetPath), {recursive: true})
        fs.writeFileSync(targetPath, content)
      } else {
        console.log('No Content')
        // copy(path.join(templateDir, file), targetPath)
      }
    }
  
    const files = await globby(['**/*'], {cwd: templateDir, dot: true})
    for (const file of files.filter((f) => f !== 'package.json')) {
      const template  = fs.readFileSync(path.join(templateDir, file), 'utf-8')
      write(root, file, ejs.render(template, options))
    }

    const pkg = require(path.join(templateDir, `package.json`))

    pkg.name = jiraIssueKey

    write(root, 'package.json', JSON.stringify(pkg, null, 2))
    console.log(chalk.green('\nDone!\n'));
  }
}