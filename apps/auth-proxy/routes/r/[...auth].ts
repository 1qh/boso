import { Auth } from '@auth/core'
import Google from '@auth/core/providers/google'
import { eventHandler, toWebRequest } from 'h3'

export default eventHandler(async event =>
  Auth(toWebRequest(event), {
    basePath: '/r',
    providers: [
      Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET
      })
    ],
    redirectProxyUrl: process.env.AUTH_REDIRECT_PROXY_URL,
    secret: process.env.AUTH_SECRET,
    trustHost: Boolean(process.env.VERCEL)
  })
)
