import * as helpers from '../helpers'

const Prometheus = process.env.INSTRUMENT === 'detox'
  ? require('./PrometheusDetox').default
  : require('./PrometheusAppium').default

const prometheus = new Prometheus()

// Helper methods
prometheus.extend(helpers)

export default prometheus
