const Page = async ({ params }: { readonly params: Promise<{ slug: string }> }) => (
  <div className='flex h-screen'>
    <div className='m-auto'>Page {(await params).slug}</div>
  </div>
)

export default Page
