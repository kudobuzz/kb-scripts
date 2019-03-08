'use strict'
const spawn = require('cross-spawn')
const yargs = require('yargs-parser')
const {
  getPathToGlobalCommand,
  hereRelative,
  resolveExecutable
} = require('../common/utils')

let args = process.argv.slice(2)
const parsedAgs = yargs(args)
const executable = 'eslint'

const wasGivenFiles = parsedAgs._.length > 0

const filesToApply = wasGivenFiles ? [] : ['.']

args = wasGivenFiles ? args : args

const config = ['--config', hereRelative('../config/eslintrc.js')]
const ignore = ['--ignore-path', hereRelative('../config/eslintignore')]

const resolveParams = {
  pathToGlobalCommand: getPathToGlobalCommand(executable),
  moduleName: executable,
  cwd: process.cwd()
}
const result = spawn.sync(
  resolveExecutable(executable, resolveParams),
  [...config, ...ignore, ...args, ...filesToApply],
  { stdio: 'inherit' }
)

process.exit(result.status)
