const fs = require(`fs-extra`)
const execa = require(`execa`)

const installDependencies = async () => {
	const { stdout } = await execa('echo', [
		'yarn add netlify-cms-app gatsby-plugin-netlify-cms',
	])
	console.log(stdout)
}

/**
 * Generates a YAML config file for Netlify CMS in `static/admin/`
 * @param {string} username GitHub username
 * @param {string} repository GitHub repository
 */
const createNetlifyConfig = async (username, repository) => {
	const data = `
		backend:
			name: github
			repo: ${username}/${repository}

		media_folder: static/assets
		public_folder: assets

		collections:
			- name: blog
				label: Blog
				folder: blog
				create: true
				fields:
					- { name: path, label: Path }
					- { name: date, label: Date, widget: date }
					- { name: title, label: Title }
					- { name: body, label: Body, widget: markdown }
	`

	await fs.outputFile(`static/admin/config.yml`, data)
}

/**
 * Add Netlify CMS to a Gatsby project
 * @param {string} username GitHub username
 * @param {string} repository GitHub repository
 */
const main = async (username, repository) => {
	await installDependencies()
	await createNetlifyConfig(username, repository)
}

module.exports = main
