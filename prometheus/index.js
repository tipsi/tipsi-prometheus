import * as helpers from '../helpers'

const { INSTRUMENT } = process.env

if (!INSTRUMENT) {
  throw new Error('You should define an "INSTRUMENT" environment variable')
}

const instruments = {
  detox: require('./PrometheusDetox').default,
  appium: require('./PrometheusAppium').default,
  enzyme: require('./PrometheusEnzyme').default,
  web: require('./PrometheusWeb').default,
}

const Prometheus = instruments[INSTRUMENT]

const prometheus = new Prometheus()

// Helper methods
prometheus.extend(helpers)

export default prometheus
