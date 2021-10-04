#!/usr/bin/env node

const path = require('path');
const chalk = require('chalk');
const clear = require('clear');
const cli = require('cac')();

const file = require('./lib/file');
const inquirer = require('./lib/inquirer');
const project = require('./lib/project')
const github = require('./lib/github')

const cwd = process.cwd()
const template = 'kad'

clear()

// ask question by inquirer
// TODO: 能夠選擇不同模板 / 不同模板又各自的流程
// TODO: 建立選擇模板的問答
// TODO: 各自模板流程模組化
// TODO: 推上 github origin
const run = async () => {
  try {
    cli
    .command("create-app")
    .action(async () => {
      const result = await inquirer.askProjectInfo()
       // user choice associated with prompts
      const { branchName, jiraIssueKey, cid } = result
      const root = path.join(cwd)
      // create project by answers
      await project.init(root, template, { branchName, jiraIssueKey, cid})
      // create git branch<deploy> and push to remote
      await github.createBranchByKadStrategy(branchName)
      console.log(chalk.green(`Good luck for development`))
    });

    cli.help();
    cli.parse(process.argv, { run: false });
    await cli.runMatchedCommand();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

run()
