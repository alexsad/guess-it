let path = require('path');
let packageJson = require('./package.json');
let vendors = Object.keys(packageJson.dependencies);
let polyfills = ['es6-shim','whatwg-fetch','tslib'];

polyfills.forEach(polyKey => {
    let indx = vendors.indexOf(polyKey);
    if(indx > -1){
        vendors.splice(indx,1);
    }    
});

module.exports = {
    entry: {
    	polyfills,
    	app:['./src/find-me/main/main.ts']
    },
    output: {
        path: path.resolve(__dirname, './public'), 
        filename: '[name]-bundle.js'
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
				test: modulePath => modulePath.endsWith('.ts') && !modulePath.endsWith('.d.ts'),
				loader: 'ts-loader'
			}
			,{ test: /\.html$/,loader:'ferrugemjs-loader'}
			,{
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
            ,{
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader']
            }
            ,{
    			test: /\.(d\.ts|eot|woff|woff2|ttf|svg|png|jpg|less)$/,
   				loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
			}
		]
    },
	resolve: {
		extensions: [".js",".ts",".html"]
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
