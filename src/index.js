function Whisp (name, level) {
  this.name = name || ''
  this.onWorkEnd = function () {}
  this.onWorkError = function () {}

  this._level = level || 'debug'
  this._workers = {}
  this._templates = {}
  this._levels = ['trace', 'debug', 'info', 'warn', 'error', 'silent']

  this._replaceMethods()
}

Whisp.prototype.level = function (level) {
  if (arguments.length === 0) { return this._level }
  this._level = level
  this._replaceMethods()
  return this
}

Whisp.prototype.worker = function (name, worker) {
  if (arguments.length === 1) { return this._workers[name] }
  this._workers[name] = worker
  return this
}

Whisp.prototype.template = function (name, template) {
  var id = this._getTemplateId(name)
  if (arguments.length === 1) { return this._templates[id] }
  this._templates[id] = template
  return this
}

Whisp.prototype._getTemplateId = function (name) {
  return 'template-' + name
}

Whisp.prototype._isLevelValid = function (level) {
  return this._getLevelValue(level) >= this._getLevelValue(this._level)
}

Whisp.prototype._getLevelValue = function (level) {
  return this._levels.indexOf(level)
}

Whisp.prototype._replaceMethods = function () {
  for (var i = 0; i < this._levels.length; i++) {
    var level = this._levels[i]
    this[level] = this._isLevelValid(level) ? this._make(level) : function () { return this }
  }

  this.log = this.debug
}

Whisp.prototype._make = function (level) {
  var noop = function () { return this }

  if (console === undefined || level === 'silent') { return noop }

  var method = console[(level === 'debug' ? 'log' : level)]

  return !method ? noop : function () {
    var requestedTemplate = arguments[0] && this._templates[arguments[0]]
    var template = requestedTemplate || this.template('default')
    var args = [].slice.call(arguments).slice(requestedTemplate ? 1 : 0)
    args.unshift(level)
    method.apply(console, template ? [template.apply(this, args)] : arguments)
    this._runWorkers.apply(this, args)
    return this
  }
}

Whisp.prototype._runWorkers = function () {
  if (typeof Promise !== 'undefined') {
    var promises = []
    var keys = Object.keys(this._workers)
    for (var i = 0; i < keys.length; i++) {
      promises.push(this._workers[keys[i]].apply(this, arguments))
    }
    Promise.all(promises)
      .then(this.onWorkEnd)
      .catch(this.onWorkError)
  }
}

export default Whisp
