#!/usr/bin/env node
'use strict'

const meow = require(`meow`)
const setUpNetlifyCMS = require(`.`)

const cli = meow(
	`
	Usage
		$ set-up-netlify-cms --username ImedAdel --repository blog
	
	Options
		--username, -u Your GitHub username
		--repository, -r Your GitHub repository
`,
	{
		flags: {
			username: {
				type: `string`,
				alias: `u`,
			},
			repository: {
				type: `string`,
				alias: `r`,
			},
		},
	}
)

console.log(cli.input[0], cli.flags)
if (!cli.flags.u || !cli.flags.r) console.error(`Missing username or repository.`)

setUpNetlifyCMS(cli.flags.username, cli.flags.repository)