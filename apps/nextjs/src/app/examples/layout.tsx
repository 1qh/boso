import ThemeToggle from '~/components/theme-toggle'
import Nav from './shadcn/nav'

const Layout = ({ children }: { readonly children: React.ReactNode }) => (
  <div className='flex h-screen flex-col'>
    <div className='fixed right-1 top-1'>
      <ThemeToggle />
    </div>
    <div>
      <Nav />
    </div>
    {children}
  </div>
)

export default Layout
