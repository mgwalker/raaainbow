# raaainbow

Draws rainbows in the terminal.  You can execute it with:

```bash
npm start
```

Note that a mode must be specified, and the help text will tell you what modes are available.  To specify a mode, set the mode flag:

```bash
npm start -- --mode circle
```

![Screenshot](http://i.imgur.com/69kEYNz.gif)

Before starting a node, the main script will clear the screen.  It will also clear the screen when the process exits.

# Modes

Modes are basically just plugins.  Any `.js` file located in the `./modes` directory that exports a conforming interface will be treated as a mode.  The interface is pretty simple.  The module must export a simple object with two properties:

```javascript
{
	name: "Mode name",
	run: function() { }
}
```

The startup script checks the existence and types of the two properties for conformance.  Quack quack!

# The Colors

The easiest way to draw colored rectangles on the terminal is to use the array provided by `require("../colors")`.  That exports an array of strings with color escape codes that set the background color along the ROYGBV spectrum, in order, including a spectrum from purple back to red.

If you want to do foreground colors, you'll currently have to do that yourself, but there's no good reason you couldn't extend the colors module and submit a PR...  😄

---

# Contributing

Want to add another rainbow mode?  Great!  Just create a PR.  Make sure it builds (the provided `npm run build` script is all that's required) and conforms to the plugin interface (described above)!  Feel free to add dependencies that will make your life easier.

If you modify any of the core functionality, you should also update any modes that depend on that functionality.