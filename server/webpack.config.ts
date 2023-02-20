import { Configuration } from 'webpack';
import 'webpack-dev-server';
import nodeExternals from 'webpack-node-externals';
import path from 'path';

const config: Configuration = {
  target: 'node',
  mode: 'production',
  entry: {
    main: './src/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'server.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  performance: {
    hints: false,
  },
  externals: [nodeExternals()]
};

export default config;