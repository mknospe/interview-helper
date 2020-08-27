import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default (environment, argv) => {
	const {app, env} = argv || {};

	return  {
		mode: 'development',
		entry: {
			'bundle': `./src/app.js`,
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'main.bundle.js',
			chunkFilename: '[name].chunk.js',
			publicPath: '/',
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: ['babel-loader'],
				},
				{
					test: /\.html$/,
					use: [{
						loader: 'html-loader'
					}]
				},
				{
					test: /\.(png|svg|jpg|gif)$/,
					loader: 'file-loader',
					options: {
						esModule: false,
						name: 'img/[name].[ext]',
					},
				},
				{
					test: /\.s?[ac]ss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{ loader: 'css-loader', options: { url: false, sourceMap: true } },
						{ loader: 'sass-loader', options: { sourceMap: true } }
					],
				}
			]
		},
		devServer: {
			open: false,
			historyApiFallback: true,
			contentBase: path.join(__dirname, 'public'),
			port: 3030
		},
		resolve: {
			modules: ['node_modules', './src'],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'styles.css'
			}),
			new Dotenv({
				path: `./env/.env-${environment}`
			}),
			new HtmlWebPackPlugin({
				template: './src/html/index.ejs',
				filename: './index.html',
			}),

		]
	}
};
