const path = require('path');
const webpack = require('webpack');

module.exports = {
    
    entry: './src/index.js',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true 
    },

    mode: 'development', 

    devServer: {
        static: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 3000,
        open: true 
    },

    resolve: {
        fallback: {
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"), 
            "buffer": require.resolve("buffer")
        }
    },

    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer']
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ],

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    }
};
