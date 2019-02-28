const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfigs = require('./webpack.config.base')


const configs = baseConfigs.map((baseConfig =>{
    let config = merge(baseConfig,{
        mode: 'development' ,
        output: {
            filename: baseConfig.output.filename+'.js',
          },
        devtool: 'inline-source-map'
    })
    return config
}))

module.exports = configs