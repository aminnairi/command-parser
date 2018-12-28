import { resolve } from 'path';

interface CommandOptions {
  development: Boolean,
  production: Boolean
}

export default ({ development, production }: CommandOptions) => ({
  mode: development ? 'development' : production ? 'production' : 'production',
  entry: resolve('src', 'index.ts'),

  output: {
    path: resolve(''),
    filename: 'index.js'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  }
});