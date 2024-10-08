const Page = ({ params }: { readonly params: { slug: string } }) => (
  <div className='flex h-screen'>
    <div className='m-auto'>Page {params.slug}</div>
  </div>
)

export default Page
