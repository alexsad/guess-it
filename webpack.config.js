var path = require('path');

module.exports = {
    entry: './src/find-me/main/main.ts',
    output: {
        path: path.resolve(__dirname, './public'), 
        filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        contentBase: './',
        port: 9000,
        proxy: {
		  "/cards": {
		    target: "http://localhost:3000",
		    pathRewrite: {"^/cards/" : "/cards/"}
		  }
		  ,"/socket.io":{
		    target: "http://localhost:3000",
		    pathRewrite: {"^/socket.io/" : "/socket.io/"}			
		  }
		}
    },
	module: {
        loaders: [
			{
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: { configFile:'tslint.json' }
            }        
            ,{
				test: /\.ts$/,
				loader: 'ts-loader'
			}
			,{ test: /\.html$/,loader:'ferrugemjs-loader'}
			,{
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
            ,{
    			test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
   				loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
			}
		]
    },
	resolve: {
		extensions: [".ts",".html",".js"]
		,alias:{    		
			"apps":path.resolve(__dirname, './src/find-me')
			,"ui":path.resolve(__dirname, './src/ui')
			,"root_app":path.resolve(__dirname, './src/find-me')
			,"ferrugemjs":"ferrugemjs/dist/core"
			,"ferrugemjs-router":"ferrugemjs-router/dist/router"
			,"bootstrap":"bootstrap/dist"
			,"bootstrap-datepicker":"bootstrap-datepicker/dist"
			,"selectize":"selectize/dist"
		}    
	}
}
