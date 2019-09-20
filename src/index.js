// Ugly but nearly all decisions were made to reduce output size.
function Whisp(name, level, runners, template) {
  var self = this;
  var noop = function() {}

  self.name = name || "";
  self.level = level || "debug";

  self._runners = runners || [];
  self._template = template || null;
  self._levels = ['trace', 'debug', 'info', 'warn', 'error', 'silent'];
  self._replaceMethods();

  self.is = function(level) {
    if (self._levels.indexOf(level) >= 0) {
      self.level = level;
      self._replaceMethods();
    }
  }

  self._replaceMethods = function() {
    for (var i = 0; i < self._levels.length; i++) {
      var level = self._levels[i]
      this[level] = self._isLevelValid(level) ?  self._make(level) : noop;
    }

    self.log = self.debug;
  }

  self._make = function(level) {
    if (console === undefined || level === "silent") { return noop; }

    var fn = console[(level === "debug" ? "log" : level)].bind(console);

    return (typeof fn === undefined) ? noop : function(...args) {
      self._run(self.name, level, args)
      var template = self._template ? self._template(self.name, level, args) : args;
      fn(template);
    };
  }

  self._run = function(name, level, args) {
    for (var i = 0; i < self._runners.length; i++) {
      self._runners[i](name, level, args)
    }
  }

  self._isLevelValid = function(level) {
    return self._levels.indexOf(level) >= self._levels.indexOf(self.level);
  }
}

export default Whisp;

