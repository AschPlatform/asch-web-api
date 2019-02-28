const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfigs = require('./webpack.config.base')


const configs = baseConfigs.map((baseConfig =>{
    let config = merge(baseConfig,{
        mode: 'production' ,
        output: {
            filename: baseConfig.output.filename+'.min.js',
          },
        devtool: 'source-map'
    })
    return config
}))

module.exports = configs