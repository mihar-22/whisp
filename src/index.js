
function Whisp(name, level, runners, template, onRunEnd) {
  var self = this;
  var noop = function() {}

  self.name = name || "";
  self.level = level || "debug";
  self.onRunEnd = onRunEnd;

  self._runners = runners || [];
  self._template = template || null;
  self._levels = ['trace', 'debug', 'info', 'warn', 'error', 'silent'];

  self.is = function(level) {
    if (self._levels.indexOf(level) >= 0) {
      self.level = level;
      self._replaceMethods();
    }
  }

  self._replaceMethods = function() {
    for (var i = 0; i < self._levels.length; i++) {
      var level = self._levels[i]
      self[level] = self._isLevelValid(level) ?  self._make(level) : noop;
    }

    self.log = self.debug;
  }

  self._make = function(level) {
    if (console === undefined || level === "silent") { return noop; }

    var method = console[(level === "debug" ? "log" : level)]
    var fn = method && method.bind(console);

    return !fn ? noop : function() {
      /**
       * All this mumbo jumbo is to avoid using the spread operator so people can support
       * IE without resorting to Babel. Only a ~30b difference using this instead of spread anyway.
       */
      var args = Array.prototype.slice.call(arguments);
      args.unshift(level)
      args.unshift(self.name)
      self._template ? fn(self._template.apply(self, args)) : fn.apply(console, arguments);
      self._run.apply(self, args)
    };
  }

  self._run = function() {
    var promises = [];
    for (var i = 0; i < self._runners.length; i++) {
      promises.push(self._runners[i].apply(self, arguments))
    }
    Promise.all(promises).then(this.onRunEnd)
  }

  self._isLevelValid = function(level) {
    return self._levels.indexOf(level) >= self._levels.indexOf(self.level);
  }

  self._replaceMethods();
}

export default Whisp;

