'use strict'

const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http')
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express')
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api')
const opentelemetry = require('@opentelemetry/sdk-node')
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger')
const { Resource } = require('@opentelemetry/resources')
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions')

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO)

module.exports = (serviceName) => {
  // const exporter = new opentelemetry.tracing.ConsoleSpanExporter()
  const exporter = new JaegerExporter({
    endpoint: 'http://localhost:14268/api/traces'
  })

  const resource = new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: serviceName
  })
  const sdk = new opentelemetry.NodeSDK({
    traceExporter: exporter,
    instrumentations: [
      new HttpInstrumentation(),
      new ExpressInstrumentation()
    ],
    resource: resource
  })

  sdk.start()
}
