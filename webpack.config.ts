import { resolve } from 'path';

interface CommandOptions {
  development: Boolean,
  production: Boolean
}

export default ({ development, production }: CommandOptions) => ({
  mode: development ? 'development' : production ? 'production' : 'production',
  target: 'node',
  entry: resolve('src', 'index.ts'),

  output: {
    path: resolve(''),
    filename: 'index.js',
    libraryTarget: 'commonjs'
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          'prettier-loader',
          'tslint-loader'
        ]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  }
});