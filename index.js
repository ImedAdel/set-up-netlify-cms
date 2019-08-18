const fs = require(`fs-extra`)
const execa = require(`execa`)

const installDependencies = async () => {
	const { stdout } = await execa('echo', [
		'yarn add netlify-cms-app gatsby-plugin-netlify-cms',
	])
	console.log(stdout)
}
const createNetlifyConfig = async () => {
	const data = `
		backend:
			name: test-repo

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

const main = async () => {
	await installDependencies()
	await createNetlifyConfig()
}

module.exports = main
