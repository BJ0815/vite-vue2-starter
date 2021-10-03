const inquirer = require('inquirer');

module.exports = {
  askIgnoreFiles: (filelist) => {
    const questions = [
      {
        type: 'checkbox',
        name: 'ignore',
        message: 'Select the files and/or folders you wish to ignore:',
        choices: filelist,
        default: ['node_modules', 'bower_components']
      }
    ];
    return inquirer.prompt(questions);
  },
  askProjectInfo: () => {
    return inquirer.prompt([{
      name: "branchName",
      type: "input",
      message: "分支名稱, ex: 104/20210601: ",
      validate: function(value) {
        if (/^[0-9a-z\-\_]+\/\d{8}/.test(value)) {
          return true;
        } else {
          return '請輸入正確 分支名稱';
        }
      }
    },
    {
      name: "jiraIssueKey",
      type: "input",
      message: "JIRA單號, ex: ZT-1124: ",
      validate: function(value) {
        if (value.startsWith("ZT-")) {
          return true;
        } else {
          return '請輸入正確 JIRA單號';
        }
      }
    },
    {
      name: "cid",
      type: "input",
      message: "Customer ID (custno), ex: 84598349: ",
      validate: function(value) {
        if (/^\d+$/.test(value)) {
          return true;
        } else {
          return '請輸入正確 Customer ID';
        }
      }
    }],
    {
      onCancel: () => {
        throw new Error(red('✖') + ' Operation cancelled')
      }
    })
  }
};