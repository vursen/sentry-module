import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import { Dedupe, ExtraErrorData, ReportingObserver, Vue as VueIntegration } from '@sentry/integrations'

export default function (ctx, inject) {
  const opts = Object.assign({}, <%= serialize(options) %>, {
    integrations: [
      new Dedupe,
      new ExtraErrorData,
      new ReportingObserver,
      new VueIntegration({ Vue })
    ]
  })

  if (!opts.disabled) {
    Sentry.init(opts)
  }

  // Inject Sentry to the context as $sentry
  ctx.$sentry = Sentry
  inject('sentry', Sentry)
}
