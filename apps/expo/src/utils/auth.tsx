import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router'
import * as Browser from 'expo-web-browser'

import { api } from './api'
import { getBaseUrl } from './base-url'
import { deleteToken, setToken } from './session-store'

export const signIn = async () => {
  const signInUrl = `${getBaseUrl()}/api/auth/signin`,
    redirectTo = Linking.createURL('/login'),
    result = await Browser.openAuthSessionAsync(
      `${signInUrl}?expo-redirect=${encodeURIComponent(redirectTo)}`,
      redirectTo
    )
  if (result.type !== 'success') {
    return
  }
  const url = Linking.parse(result.url),
    sessionToken = String(url.queryParams?.session_token)
  if (!sessionToken) {
    return
  }
  setToken(sessionToken)
}

export const useUser = () => {
  const { data: session } = api.auth.getSession.useQuery()
  return session?.user ?? null
}

export const useSignIn = () => {
  const utils = api.useUtils(),
    router = useRouter()

  return async () => {
    await signIn()
    await utils.invalidate()
    router.replace('/')
  }
}

export const useSignOut = () => {
  const utils = api.useUtils(),
    signOut = api.auth.signOut.useMutation(),
    router = useRouter()

  return async () => {
    const res = await signOut.mutateAsync()
    if (!res.success) {
      return
    }
    await deleteToken()
    await utils.invalidate()
    router.replace('/')
  }
}
