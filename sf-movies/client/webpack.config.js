const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack')
module.exports = {
	// The point or points where to start the application bundling process
	entry: './src/index.js',
	output: {
		// The output directory as an absolute path.
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx']	
	},
	// Prevent webpack from parsing any files matching the given regular expression
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader'
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './public/index.html',
			filename: 'index.html'
		}),
		new Dotenv({
			path: './.env'
		})
	]
};
