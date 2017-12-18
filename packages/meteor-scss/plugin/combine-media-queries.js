
const parseCss = Npm.require("css-parse");

CombineMediaQueries = function(stringifiedCss, callback) {

  const options = {
    log: false,
    ext: false,
    use_external: false
  };

  // Process Imports
  const processImport = function(cssImport) {
    const strCss = "@import " + cssImport.import + ";" + "\n\n";
    return strCss;
  };

  // Process comments
  const processComment = function(comment) {
    const strCss = "/*" + comment.comment + "*/";
    return strCss;
  };

  // Process declaration
  const processDeclaration = function(declaration) {
    const strCss = declaration.property + ": " + declaration.value + ";";
    return strCss;
  };

  // Check declarations type
  const commentOrDeclaration = function(declarations) {
    let strCss = "";
    if (declarations.type === "declaration") {
      strCss += "\n\t" + processDeclaration(declarations);
    } else if (declarations.type === "comment") {
      strCss += " " + processComment(declarations);
    }
    return strCss;
  };

  // Process normal CSS rule
  const processRule = function(rule) {
    let strCss = "";
    strCss += rule.selectors.join(",\n") + " {";
    rule.declarations.forEach(function(rules) {
      strCss += commentOrDeclaration(rules);
    });
    strCss += "\n}\n\n";
    return strCss;
  };

  // Check rule type
  const commentOrRule = function(rule) {
    let strCss = "";
    if (rule.type === "rule") {
      strCss += processRule(rule);
    } else if (rule.type === "comment") {
      strCss += processComment(rule) + "\n\n";
    }
    return strCss;
  };

  // Check keyframe type
  const commentOrKeyframe = function(frame) {
    let strCss = "";
    if (frame.type === "keyframe") {
      strCss += frame.values.join(",") + " {";
      frame.declarations.forEach(function(declaration) {
        strCss += commentOrDeclaration(declaration);
      });
      strCss += "\n}\n\n";
    } else if (frame.type === "comment") {
      strCss += processComment(frame) + "\n\n";
    }
    return strCss;
  };

  // Process media queries
  const processMedia = function(media) {
    let strCss = "";
    strCss += "@media " + media.rule + " {\n\n";
    media.rules.forEach(function(rule) {
      strCss += commentOrRule(rule);
    });
    strCss += "}\n\n";

    return strCss;
  };

  // Process keyframes
  const processKeyframes = function(key) {
    let strCss = "";
    strCss += "@" + (typeof key.vendor !== "undefined" ? key.vendor : "") + "keyframes " + key.name + " {\n\n";
    key.keyframes.forEach(function(keyframe) {
      strCss += commentOrKeyframe(keyframe);
    });
    strCss += "}\n\n";

    return strCss;
  };

  const processFontFace = function(key) {
    let strCss = "";
    strCss += "@" + "font-face {\n\n";
    key.declarations.forEach(function(rule) {
      strCss += commentOrDeclaration(rule);;
    });
    strCss += "}\n\n";
    return strCss;
  };

  function transform(css) {

    var cssJson = parseCss(css);
    var strStyles = [];
    var strMediaStyles = [];
    var processedCSS = {};


    processedCSS.imports = [];
    processedCSS.base = [];
    processedCSS.media = [];
    processedCSS.media.all = [];
    processedCSS.media.minWidth = [];
    processedCSS.media.maxWidth = [];
    processedCSS.media.minHeight = [];
    processedCSS.media.maxHeight = [];
    processedCSS.media.print = [];
    processedCSS.media.blank = [];
    processedCSS.keyframes = [];
    processedCSS.fontFace = [];

    // For every rule in the stylesheet...
    cssJson.stylesheet.rules.forEach(function(rule) {
      // If the rule type is an import
      if(rule.type === "import") {
        processedCSS.imports.push(rule);
      }

      // if the rule is a media query...
      if (rule.type === "media") {

        // Create 'id' based on the query (stripped from spaces and dashes etc.)
        let strMedia = rule.media.replace(/[^A-Za-z0-9]/ig, "");

        // Create an array with all the media queries with the same 'id'
        let item = processedCSS.media.filter(function(element) {
          return (element.val === strMedia);
        });

        // If there are no media queries in the array, define details
        if (item.length < 1) {
          let mediaObj = {};
          mediaObj.sortVal = parseFloat(rule.media.match(/\d+/g));
          mediaObj.rule = rule.media;
          mediaObj.val = strMedia;
          mediaObj.rules = [];

          processedCSS.media.push(mediaObj);
        }

        // Compare the query to other queries
        var i = 0, matched = false;
        processedCSS.media.forEach(function(elm) {
          if (elm.val === strMedia) {
            matched = true;
          }
          if (!matched) {
            i++;
          }
        });

        // Push every merged query
        rule.rules.forEach(function(mediaRule) {
          if (mediaRule.type === "rule" || "comment") {
            processedCSS.media[i].rules.push(mediaRule);
          }
        });

      } else if (rule.type === "keyframes") {
        processedCSS.keyframes.push(rule);

      } else if (rule.type === "font-face") {
        processedCSS.fontFace.push(rule)

      } else if (rule.type === "rule" || "comment") {
        processedCSS.base.push(rule);
      }
    });

    // Sort media queries by kind, this is needed to output them in the right order
    processedCSS.media.forEach(function(item) {
      if (item.rule.match(/min-width/)) {
        processedCSS.media.minWidth.push(item);
      } else if (item.rule.match(/min-height/)) {
        processedCSS.media.minHeight.push(item);
      } else if (item.rule.match(/max-width/)) {
        processedCSS.media.maxWidth.push(item);
      } else if (item.rule.match(/max-height/)) {
        processedCSS.media.maxHeight.push(item);
      } else if (item.rule.match(/print/)) {
        processedCSS.media.print.push(item);
      } else if (item.rule.match(/all/)) {
        processedCSS.media.all.push(item);
      } else {
        processedCSS.media.blank.push(item);
      }
    });

    // Function to determine sort order
    var determineSortOrder = function(a, b, isMax) {
      var sortValA = a.sortVal,
              sortValB = b.sortVal;
      isMax = typeof isMax !== "undefined" ? isMax : false;

      // consider print for sorting if sortVals are equal
      if (sortValA === sortValB) {
        if (a.rule.match(/print/)) {
          // a contains print and should be sorted after b
          return 1;
        }
        if (b.rule.match(/print/)) {
          // b contains print and should be sorted after a
          return -1;
        }
      }

      // return descending sort order for max-(width|height) media queries
      if (isMax) {
        return sortValB - sortValA;
      }

      // return ascending sort order
      return sortValA - sortValB;
    };

    // Sort media.all queries ascending
    processedCSS.media.all.sort(function(a, b) {
      return determineSortOrder(a, b);
    });

    // Sort media.minWidth queries ascending
    processedCSS.media.minWidth.sort(function(a, b) {
      return determineSortOrder(a, b);
    });

    // Sort media.minHeight queries ascending
    processedCSS.media.minHeight.sort(function(a, b) {
      return determineSortOrder(a, b);
    });

    // Sort media.maxWidth queries descending
    processedCSS.media.maxWidth.sort(function(a, b) {
      return determineSortOrder(a, b, true);
    });

    // Sort media.maxHeight queries descending
    processedCSS.media.maxHeight.sort(function(a, b) {
      return determineSortOrder(a, b, true);
    });

    // Function to output CSS Imports
    var outputImports = function(base){
      base.forEach(function (rule) {
        strStyles += processImport(rule);
      });
    };

    // Function to output base CSS
    var outputBase = function(base) {
      base.forEach(function(rule) {
        strStyles += commentOrRule(rule);
      });
    };

    // Function to output media queries
    var outputMedia = function(media) {
      if (options.use_external) {
        media.forEach(function(item) {
          strMediaStyles += processMedia(item);
        });
      } else {
        media.forEach(function(item) {
          strStyles += processMedia(item);
        });
      }

    }
    ;

    // Function to output keyframes
    var outputKeyFrames = function(keyframes) {
      keyframes.forEach(function(keyframe) {
        strStyles += processKeyframes(keyframe);
      });
    };

    var outputFontFace = function(fonts) {
      fonts.forEach(function(font) {
        strStyles += processFontFace(font);
      });
    };

    // Check if the imports CSS was processed and print them
    if (processedCSS.imports.length !== 0){
      outputImports(processedCSS.imports);
    }

    // Check if base CSS was processed and print them
    if (processedCSS.base.length !== 0) {
      outputBase(processedCSS.base);
    }

    // Check if media queries were processed and print them in order
    if (processedCSS.media.length !== 0) {
      outputMedia(processedCSS.media.blank);
      outputMedia(processedCSS.media.all);
      outputMedia(processedCSS.media.minWidth);
      outputMedia(processedCSS.media.minHeight);
      outputMedia(processedCSS.media.maxWidth);
      outputMedia(processedCSS.media.maxHeight);
      outputMedia(processedCSS.media.print);
    }

    // Check if keyframes were processed and print them
    if (processedCSS.keyframes.length !== 0) {
      outputKeyFrames(processedCSS.keyframes);
    }

    // Check if fonts were processed and print them
    if (processedCSS.fontFace.length !== 0) {
      outputFontFace(processedCSS.fontFace);
    }

    // Define the new file extension
    if (options.ext) {
      file.path = gutil.replaceExtension(file.path, options.ext);
    }

    return strStyles;

  }

  return transform(stringifiedCss);
};
