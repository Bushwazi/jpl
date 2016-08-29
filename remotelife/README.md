#Jason Lydon: Quick Code Exercise using Gulp, Jade, Stylus, REACT, JSON, Twitter and Instagram.

***

##Directions
__==== FULL STACK Exercise ====__  
We would like for you to create a basic 3-5 page website to introduce a subject of personal interest, product, game, or business of your own design. This can be a real personal project or completely made-up. Use any and all the tools and libraries you wish – just be prepared to talk about it. The key here is show us your knowledge and give us something to talk about – both technically and interest-wise!  

__Deliverables:__

1. A .zip or public repo containing the files and directories required to run your site on a local server.
    * If you're reading this, you found the repo
* Some instructions on standing it up (What do we need? Node.js? PHP? How do we fire it up?)
	* See the "Run This Project Locally" section below
* A link to the site on your own hosting with search engine indexing disabled.
	* <http://jasonlydon.com/remotelife/> <http://jasonlydon.com/remotelife/robots.txt> 

__Basic site requirements:__

* 3 to 5 pages using templates
	* DONE
* Content should be separated from the presentation – Use a CMS, JSON file, or data store of your own creation, etc to show how content can be managed separately from code.
	* Content is pulled via JSON, Instagram API or Twitter API
* Make it responsive for desktop, tablets, and mobile device viewing.
	* DONE, but I wouldn't say I pushed the limits.
* Use at least one Javascript library
	* REACT, Gulp, Stylus and core js
* Pick your favorite JS-based view layer or MVC and rock it: Angular, React+Redux/Flux/Roll-your-own, Backbone, etc.
	* Used Jade Templates for some pages and REACT for a page, just to show some diversity.
* Bring in some fun flourish with Javascript, CSS or mode of your choosing. (Think … Processing.js, Epoch.js, D3, Polymaps, etc)
	* Animated SVG as logo
* Use at least 1 third party service (Think … Twitter API, Google Data, FaceBook OpenGraph, WolframAlpha, etc) on the front- or back-end
	* Instagram API with string replace and Twitter API with REACT used in client

***


##Run this locally
__Setup__

1. Do you have [nodejs and npm](https://nodejs.org/en/) installed?
	* Running `$ node --version` and `$ npm --version` in the terminal should return a version like "v4.0.0", if not, then run the installed from the link above
* Do you have [GulpJS](http://gulpjs.com/) installed globally? _This isn't required, but sometimes not having the Gulp CLI installed globally can cause issues_
	* Running `$ gulp --version` in the terminal should return a version like "[09:08:39] CLI version 3.8.11". If you don't have it installed, follow the link above and the install directions

__Run it__

1. In the terminal, run `$ cd [PATH TO DIRECTORY]/_src`. You are now in the build folder.
2. The dependant Node Modules are not included in this repo, you need to run `$ npm install` to add them. If you run into premission issues, then run it as the Super User via `$ sudo npm install`. If you have the `_src` directory open in Viewer, you should see a `node_modules` folder added and populated. The `npm install` command read the `package.json` file and fetches the necessary dependencies.
3. The Task Manager being used is [GulpJS](http://gulpjs.com/). You can run the following tasks via the terminal
	1. `$ gulp` will run the default task which calls the markup, styles and js tasks
	* `$ gulp watch` starts the watch task, which watchs for changes in files and runs the corresponding task. You can end the watch task by typing `control + c`
	* `$ gulp markup` converts the [jade templates](http://jade-lang.com/) and data into the static html files in the root of the project. _I tried using [Pug](https://github.com/pugjs/pug) since that is the new version of Jade, but it wasn't loading data correctly_
	* `$ gulp styles` converts the [Stylus](http://stylus-lang.com/) files into CSS files, then the prefixes are cleaned up via [AutoPrefixer](https://twitter.com/autoprefixer) and the media queries are combined via [combineMQ](https://www.npmjs.com/package/gulp-combine-mq) (/public/styles/main.css). A version is exported and then the CSS is compressed via [CSSNano](http://cssnano.co/) and renamed (/public/styles/main.min.css).
	* `$ gulp js` concatonates all the javascript files and spits out a version (/public/js/main.js), then runs it through [Uglify](http://lisperator.net/uglifyjs/) and renames the file (/public/js/main.min.js)