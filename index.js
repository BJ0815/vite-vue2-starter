#!/usr/bin/env node

const path = require('path');
const chalk = require('chalk');
const clear = require('clear');
const cli = require('cac')();

const file = require('./lib/file');
const inquirer = require('./lib/inquirer');
const project = require('./lib/project')
const cwd = process.cwd()
const template = 'kad'

clear()

// if .git exists, and process.exit()
// if (file.directoryExists('.git')) {
//   console.log(chalk.red('Already a Git repository!'));
//   process.exit();
// }

// ask question by inquirer
const run = async () => {
  try {
    cli
    .command("create-app")
    .action(async () => {
      const result = await inquirer.askProjectInfo()
      console.log(result)
       // user choice associated with prompts
      const { branchName, jiraIssueKey, cid } = result
      const root = path.join(cwd)
      // create project by answers
      project.init(root, {template, branchName, jiraIssueKey, cid})
      // create git branch<deploy> and push to remote
      // create git branch<develop>
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
