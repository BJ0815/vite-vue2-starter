const git = require('simple-git/promise')();
const chalk = require('chalk')


module.exports = {
  getInstance: () => git,
  createBranchByKadStrategy: async (name) => {
    console.log(chalk.green(`Initialize Branch Strategy: ${name}`))
    const prefix = 'event/'
    const deploy_branch = `${prefix}${name.split('/').join('_')}`

    console.log(chalk.green(`Create Deploy Branch: ${deploy_branch}`))
    await git.checkoutLocalBranch(deploy_branch)

    console.log(chalk.green(`Push Deploy Branch: ${deploy_branch}`))
    await git.add('.')
    await git.commit("Init project")
    await git.push('origin', deploy_branch, ['-u'], () => console.log(chalk.green(`\nDone!\n`)));
    console.log(chalk.green(`Create Develop Branch: ${name}`))
    await git.checkoutLocalBranch(name)
    console.log(chalk.green(`\nDone!\n`))
  }
}