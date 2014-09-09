(function(jQuery) {
  // Make sure that the options object really is an object and has all properties set
  function Optionize(options) {
    // Make sure that options is an object
    options = options || {};
    // If borderWidth isn't defined then set a default value
    options.borderWidth = options.borderWidth || '10px';
    // If borderStyle isn't defined then set a default value
    options.borderStyle = options.borderStyle || 'solid';
    // If borderColor isn't defined then set a default value
    options.borderColor = options.borderColor || '#ffffff';
    // If border isn't defined then set a default value
    options.border = options.border || (options.borderWidth + " " + options.borderStyle + " " + options.borderColor);
    // If boxShadowOffsetX isn't defined then set a default value
    options.boxShadowOffsetX = options.boxShadowOffsetX || '5px';
    // If boxShadowOffsetY isn't defined then set a default value
    options.boxShadowOffsetY = options.boxShadowOffsetY || '5px';
    // If boxShadowLength isn't defined then set a default value
    options.boxShadowLength = options.boxShadowLength || '5px';
    // If boxShadowColor isn't defined then set a default value
    options.boxShadowColor = options.boxShadowColor || '#cccccc';
    // If boxShadow isn't defined then set a default value
    options.boxShadow = options.boxShadow || (options.boxShadowOffsetX + " " + options.boxShadowOffsetY + " " + options.boxShadowLength + " " + options.boxShadowColor);
    // If marginLeft isn't defined then set a default value
    options.marginLeft = options.marginLeft || 'leave';
    // If marginTop isn't defined then set a default value
    options.marginTop = options.marginTop || 'leave';
    // If marginRight isn't defined then set a default value
    options.marginRight = options.marginRight || 'leave';
    // If marginBottom isn't defined then set a default value
    options.marginBottom = options.marginBottom || 'leave';
    // If rotate isn't defined then set a default value
    options.rotate = options.rotate || 'leave';
    // If rotateMin isn't defined then set a default value
    options.rotateMin = options.rotateMin || -20;
    // If rotateMax isn't defined then set a default value
    options.rotateMax = options.rotateMax || 20;
    // If rotateAngle isn't defined then set a default value
    options.rotateAngle = options.rotateMax - options.rotateMin;
    // If rotateSeed isn't defined then set a default value
    options.rotateSeed = options.rotateSeed || 0;
    // If rotateStep isn't defined then set a default value
    options.rotateStep = options.rotateStep || 1;
    // If rotateDelay isn't defined then set a default value
    options.rotateDelay = options.rotateDelay || 40;
    return options;
  }
  // Variable to cache previously requested propNames
  var propNames = {};
  // Propertynames to check for
  var propTest = {
    'boxShadow': [
      'boxShadow', 'MozBoxShadow', 'WebkitBoxShadow'
    ],
    'transform': [
      'transform', 'MozTransform', 'WebkitTransform'
    ]
  };
  // Get the correct property name
  function GetPropName(propName) {
    // Has this property name been checked before
    if(typeof(propNames[propName]) != 'undefined') {
      // If so then return the previous result
      return propNames[propName];
    }
    // Check that the propTest has a test for this propName
    if(propTest[propName] && (propTest[propName].length > 0)) {
      // Get the root element for the document
      var node = document.documentElement;
      // Loop through the different names to test
      for(var i = 0; i < propTest[propName].length; i++) {
        // If this property name exist in the document root element...
        if(propTest[propName][i] in node.style) {
          // ... then store the result for upcoming requests
          propNames[propName] = propTest[propName][i];
          // Return the property name
          return propNames[propName];
        }
      }
    }
    // Set the property name to false to avoid future checks
    propNames[propName] = false;
    // Return false to indicate that the property wasn't found
    return false;
  }
  function SetBorder(options, jObject) {
    // Add the border
    jObject.css('border', options.border);
    var propName = GetPropName('boxShadow');
    if(propName !== false) {
      // Add the box-shadow if there is a property name available
      jObject.css(propName, options.boxShadow);
    }
  }
  function SetMargin(options, jObject) {
    // If marginLeft is defined (not equal to leave) then set it
    if(options.marginLeft != 'leave') {
      jObject.css('marginLeft', options.marginLeft);
    }
    // If marginTop is defined (not equal to leave) then set it
    if(options.marginTop != 'leave') {
      jObject.css('marginTop', options.marginTop);
    }
    // If marginRight is defined (not equal to leave) then set it
    if(options.marginRight != 'leave') {
      jObject.css('marginRight', options.marginRight);
    }
    // If marginBottom is defined (not equal to leave) then set it
    if(options.marginBottom != 'leave') {
      jObject.css('marginBottom', options.marginBottom);
    }
  }
  function DoRotateRandom(options, jObject) {
    // Calculate the randomized angle
    var rotate = Math.random() * options.rotateAngle;
    // Add the min value to calculate the actual angle
    rotate = Math.floor(options.rotateMin + rotate);
    // Rotate the image
    Rotate(jObject, rotate);
  }
  function DoRotateSeed(options, jObject) {
    if(options.rotateSeed == 0) {
      // If seed is 0 then use PI as seed
      options.rotateSeed = Math.PI;
    } else if(options.rotateSeed < 0) {
      // If seed < 0 then recalculate it
      options.rotateSeed = Math.ln(options.rotateSeed);
      if(options.rotateSeed != 0) {
        options.rotateSeed = 1 / Math.abs(options.rotateSeed);
      }
    }
    // Create a new seed value to use
    options.rotateSeed = (((options.rotateSeed * options.rotateSeed) + Math.PI) * 7) + (1/2);
    // Make sure the new value is between 0 and 1
    options.rotateSeed -= Math.floor(options.rotateSeed);
    // Calculate the angle to use
    var rotate = options.rotateSeed * options.rotateAngle;
    // Add the base offset (adds the min value)
    rotate = Math.floor(options.rotateMin + rotate);
    // Rotate the image
    Rotate(jObject, rotate);
  }
  // Create an animation
  function DoRotateAnimate(options, jObject) {
    // The current angle. This is incremented for each step
    var rotate = 0;
    // Define a local variable to keep how big each step should be
    var step = options.rotateStep;
    // Define a local variable to keep the delay
    var delay = options.rotateDelay;
    // Create an interval
    jObject.data('rotateInterval', setInterval(function() {
      // Update the rotate angle
      rotate = (rotate + step) % 360;
      // Rotate the image
      Rotate(jObject, rotate);
    }, delay));
  }
  // A wrapper function to allow rotate on different browsers
  function Rotate(jObject, rotate) {
    // W3C
    jObject.css(GetPropName('transform'), 'rotate('+rotate+'deg)');
  }
  
  // Extend jQuery(selector)
  jQuery.fn.extend({
    photoImages: function(options) {
      // Fix all options
      options = Optionize(options);
      // Loop through all all matches from the given selector
      return this.each(function() {
        // Find the jQuery object for this item
        var jThis = jQuery(this);
        // Set the border
        SetBorder(options, jThis);
        // Set the margin
        SetMargin(options, jThis);
        // Check if the image should be rotated
        if(options.rotate != 'leave') {
          if(options.rotate == 'random') {
            // Rotate the image by a random value
            DoRotateRandom(options, jThis);
          } else if(options.rotate == 'seed') {
            // Rotate the image by a seeded value
            DoRotateSeed(options, jThis);
          } else if(options.rotate == 'animate') {
            // Initiate an animation for the image
            DoRotateAnimate(options, jThis);
          } else {
            // Rotate the image by a fixed value
            Rotate(jThis, options.rotate);
          }
        }
      });
    }
  });
  
}(jQuery));