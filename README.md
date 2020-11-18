# Virtual Pub Quiz

## Dev env setup

Some steps to follow when setting up your dev env:

1. Install a package bundler and typescript compiler. We're gonna use [parcel](https://parceljs.org) for this. Parcel will convert all .ts and .tsx files into a single .js bundle. It will also take card of .css files and it's really simple to use.

Run this: `yarn add parcel-bundler --dev` to add it as a dev dependency.

Next, we're gonna add a script into `package.json` that will tell parcel to watch for changes are rebuild the project for us `yarn watch`.

Don't forget to add the `dist` folder and `.cache` folder to `.gitignore`

Next, we are gonna need a dev server to run the project. We're gonna install a javascript package called `spa-http-server` for this and add a `serve` script in our `package.json`.

Finally, to make things convenient, we will make both parcel watch and the http server start with a single command. We will use a package called `npm-run-all` for this - it allows us to run command line tasks in parallel and create a `yarn dev` command in our `package.json`

One more thing. We're gonna add prettier to autmatically format our code: `yarn add --dev prettier`. If you use .vscode, we will enable it in our .vscode settings.