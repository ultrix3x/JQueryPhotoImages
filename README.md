# JQueryPhotoImages

jQuery-plugin to convert images to photo-like images (frame, shadow and rotation)

## Distribution and development
There are two different files that can be used.

### resourceloader.js
is intended for development and testing.

### resourceloader.min.js
is intended for production usage.

The minification is done by [Googles Closure compiler](http://closure-compiler.appspot.com/) in simple mode.

## Options

### borderWidth
The width of the border around the image.

**Default value** = 10px

### borderStyle
The style of the border around the image.

**Default value** = solid

### borderColor
The color of the border around the image.

**Default value** = #ffffff

### border
This is a combined value for the border. It work the same way as for the CSS-border value ([width] [style] [color]).

If this value is omitted then it defaults to the properties for borderWidth, borderStyle and borderColor.

If this value is assigned then it overrides the individual properties for  borderWidth, borderStyle and borderColor.

### boxShadowOffsetX
The x-offset for the box-shadow

**Default value** = 5px

### boxShadowOffsetY
The y-offset for the box-shadow

**Default value** = 5px

### boxShadowLength
The shadow length for the box-shadow

**Default value** = 5px

### boxShadowColor
The color to use as a base for the box-shadow

**Default value** = #cccccc

### boxShadow
This is a combined value for the box-shadow. It work the same way as for the CSS-box-shadow value ([boxShadowOffsetX], [boxShadowOffsetY], [boxShadowLength], [boxShadowColor]).

If this value is omitted then it defaults to the properties for boxShadowOffsetX, boxShadowOffsetY, boxShadowLength and boxShadowColor.

If this value is assigned then it overrides the individual properties for boxShadowOffsetX, boxShadowOffsetY, boxShadowLength and boxShadowColor.

### marginLeft
A margin-left to use for the image. If the value is set to "leave" then the margin-left will not be changed.

**Default value** = 'leave

### marginTop
A margin-top to use for the image. If the value is set to "leave" then the margin-top will not be changed.

**Default value** = 'leave

### marginRight
A margin-right to use for the image. If the value is set to "leave" then the margin-right will not be changed.

**Default value** = 'leave

### marginBottom
A margin-bottom to use for the image. If the value is set to "leave" then the margin-bottom will not be changed.

**Default value** = 'leave

### rotate
If this property is assigned then the image will be rotated.

#### Allowed values
##### random
Uses the browsers internal random engine (Math.random) to create an angle to use for each individual image. The min value is defined by the property rotateMin. The max value is defined by the property rotateMax.

##### seed
Uses the plugins internal random engine to create an angle to use for each individual image. The min value is defined by the property rotateMin. The max value is defined by the property rotateMax.

The big difference bwtween random and seed is that seed will produce the same sequence each time which will allow the same layout for each page load.

##### animate
Creates an animation. The animation is based on the interval (time between movements) and step (how much to rotate each time).

The interval is defined in microseconds.

The step is defined in degrees.

##### numeric value
If a numeric value is used then the images is rotated this number of degrees.

##### leave
If the value is "leave" then nothing is done.
 
**Default value** = leave

### rotateMin
If the rotate property is set to random or seed then this value defines the lowest angle to rotate.

**Default value** = -20

### rotateMax
If the rotate property is set to random or seed then this value defines the highest angle to rotate.

**Default value** = 20

### rotateAngle
This is not a property that can be set. This is calculated as the difference by rotateMax and rotateMin and defines the span of the llowed angle.

### rotateSeed
When using rotate = "seed" then this defines the seed for the internal "random engine".

**Default value** = 0

### rotateStep
If using rotate = "animate" then this property defines how many degrees the image should turn each step.

**Default value** = 1

### rotateDelay
If using rotate = "animate" then this property defines the delay between steps for the animation.

**Default value** = 40
