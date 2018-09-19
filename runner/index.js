const runner = process.env.INSTRUMENT === 'detox'
  ? require('./runnerDetox').default
  : require('./runnerAppium').default

runner()
