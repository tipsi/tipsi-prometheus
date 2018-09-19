export default class Prometheus {
  init(test) {
    this.t = test
    return this
  }

  extend(plugins) {
    Object.keys(plugins).forEach((key) => {
      const plugin = plugins[key]
      this[key] = plugin.bind(this)
    })
  }
}
