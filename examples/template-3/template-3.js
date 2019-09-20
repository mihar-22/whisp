/**
 * Inspired by / Copy pasted mostly from
 * https://github.com/MichaelCereda/pretty-cli/blob/master/src/templates/advanced.js
 */

const colors = require('colors/safe');

function block(msg){
  return ' '+msg+' ';
}

var types =  {
  'info': {initial: 'I', blockBg:['bgBlue','black'], titleColor:'blue'},
  'error': {initial: 'E', blockBg:['bgRed','white'], titleColor:'red'},
  'log': {initial: 'L', blockBg:['bgWhite','black'], titleColor:'white'},
  'warning': {initial: 'W', blockBg:['bgYellow','black'], titleColor:'yellow'},
}

var template = {};
Object.keys(types).map(function(type){
  var _specs = types[type];

  template[type] = function(content){
    var line = colors[_specs.blockBg[0]][_specs.blockBg[1]](block(_specs.initial))
      +" " + content;
    if(typeof content !== 'string'){
      line = colors[_specs.blockBg[0]][_specs.blockBg[1]](block(_specs.initial))
        +" " + content.message;
      if(content.type=='title'){
        line = colors[_specs.blockBg[0]][_specs.blockBg[1]](block(content.name))
          + " " + colors[_specs.titleColor](content.message);
      }
      if(content.description){
        line +='\n'+ content.description;
      }
    }
    return line;
  }
})
module.exports = template;
