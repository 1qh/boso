export { auth as middleware } from '@a/auth'

// Or like this if you need to do something here.
// Export default auth((req) => {
//   Console.log(req.auth) //  { session: { user: { ... } } }
// })

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
