const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfigs = require('./webpack.config.base')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const configs = baseConfigs.map((baseConfig =>{
    let filename =  baseConfig.output.filename+'.js'
    let config = merge(baseConfig,{
        mode: 'development' ,
        output: {
            filename: filename
          },
        devtool: 'inline-source-map',
        plugins: [
            new CleanWebpackPlugin(['dist/webpack/'+filename+'*'],
            {  
                verbose:  true,
                dry:      false
            })
          ]
    })
    return config
}))

module.exports = configs