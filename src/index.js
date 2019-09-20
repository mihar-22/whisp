var noop = function() {}

function Logger(name, level, runners, template) {
  this.name = name || "";
  this.level = level || "debug";
  this._runners = runners || [];
  this._template = template || null;
  this._levels = ['trace', 'debug', 'info', 'warn', 'error', 'silent'];
  this._replaceMethods();
}

Logger.prototype.setLevel = function(level) {
  if (this._levels.indexOf(level) >= 0) {
    this.level = level;
    this._replaceMethods();
  }
}

Logger.prototype._replaceMethods = function() {
  for (var i = 0; i < this._levels.length; i++) {
    var level = this._levels[i]
    this[level] = this._isLevelValid(level) ?  this._make(level) : noop;
  }

  this.log = this.debug;
}

Logger.prototype._make = function(level) {
  if (console === undefined || level === "silent") { return noop; }

  var fn = console[(level === "debug" ? "log" : level)].bind(console);

  return (typeof fn === undefined) ? noop : function(...args) {
    this._run(this.name, level, args)
    var template = this._template ? this._template(this.name, level, args) : args;
    fn(template);
  };
}

Logger.prototype._run = function(name, level, args) {
  for (var i = 0; i < this._runners.length; i++) {
    this._runners[i](name, level, args)
  }
}

Logger.prototype._isLevelValid = function(level) {
  return this._levels.indexOf(level) >= this._levels.indexOf(this.level);
}

export default Logger;

