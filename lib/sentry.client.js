import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

export default function (ctx, inject) {
  const opts = Object.assign({}, <%= serialize(options) %>, {
    integrations: [
      new Integrations.Dedupe,
      new Integrations.ExtraErrorData,
      new Integrations.InboundFilters,
      new Integrations.FunctionToString,
      new Integrations.TryCatch,
      new Integrations.Breadcrumbs,
      new Integrations.GlobalHandlers,
      new Integrations.LinkedErrors,
      new Integrations.UserAgent,
      new Integrations.ReportingObserver,
      new Integrations.Vue({ Vue })
    ]
  })

  if (!opts.disabled) {
    Sentry.init(opts)
  }

  // Inject Sentry to the context as $sentry
  ctx.$sentry = Sentry
  inject('sentry', Sentry)
}
