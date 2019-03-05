const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfigs = require('./webpack.config.base')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const configs = baseConfigs.map((baseConfig =>{
    let filename = baseConfig.output.filename+'.min.js'
    let config = merge(baseConfig,{
        mode: 'production' ,
        output: {
            filename: filename
          },
        devtool: 'source-map',
        plugins: [
            new CleanWebpackPlugin(['dist/webpack/'+filename+'*'],
            {  
                // exclude:  ['*.min.*'],
                verbose:  true,
                dry:      false
            })
          ]
    })
    return config
}))

module.exports = configs