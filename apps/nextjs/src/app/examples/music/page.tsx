import type { Metadata } from 'next'
import Image from 'next/image'
import { PlusCircledIcon } from '@radix-ui/react-icons'

import { Button } from '@a/ui/button'
import { ScrollArea, ScrollBar } from '@a/ui/scroll-area'
import { Separator } from '@a/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@a/ui/tabs'

import { AlbumArtwork } from './components/album-artwork'
import { Menu } from './components/menu'
import { PodcastEmptyPlaceholder } from './components/podcast-empty-placeholder'
import { Sidebar } from './components/sidebar'
import { listenNowAlbums, madeForYouAlbums } from './data/albums'
import { playlists } from './data/playlists'

export const metadata: Metadata = {
  description: 'Example music app using the components.',
  title: 'Music App'
}

export default function MusicPage() {
  return (
    <>
      <div className='md:hidden'>
        <Image
          alt='Music'
          className='block dark:hidden'
          height={1114}
          src='/examples/music-light.png'
          width={1280}
        />

        <Image
          alt='Music'
          className='hidden dark:block'
          height={1114}
          src='/examples/music-dark.png'
          width={1280}
        />
      </div>

      <div className='hidden md:block'>
        <Menu />

        <div className='border-t'>
          <div className='bg-background'>
            <div className='grid lg:grid-cols-5'>
              <Sidebar className='hidden lg:block' playlists={playlists} />

              <div className='col-span-3 lg:col-span-4 lg:border-l'>
                <div className='h-full px-4 py-6 lg:px-8'>
                  <Tabs className='h-full space-y-6' defaultValue='music'>
                    <div className='flex items-center'>
                      <TabsList>
                        <TabsTrigger className='relative' value='music'>
                          Music
                        </TabsTrigger>

                        <TabsTrigger value='podcasts'>Podcasts</TabsTrigger>

                        <TabsTrigger disabled value='live'>
                          Live
                        </TabsTrigger>
                      </TabsList>

                      <div className='ml-auto mr-4'>
                        <Button>
                          <PlusCircledIcon className='mr-2 size-4' />
                          Add music
                        </Button>
                      </div>
                    </div>

                    <TabsContent className='border-none p-0 outline-none' value='music'>
                      <div className='flex items-center justify-between'>
                        <div className='space-y-1'>
                          <h2 className='text-2xl font-semibold tracking-tight'>Listen Now</h2>

                          <p className='text-sm text-muted-foreground'>
                            Top picks for you. Updated daily.
                          </p>
                        </div>
                      </div>

                      <Separator className='my-4' />

                      <div className='relative'>
                        <ScrollArea>
                          <div className='flex space-x-4 pb-4'>
                            {listenNowAlbums.map(album => (
                              <AlbumArtwork
                                album={album}
                                aspectRatio='portrait'
                                className='w-[250px]'
                                height={330}
                                key={album.name}
                                width={250}
                              />
                            ))}
                          </div>

                          <ScrollBar orientation='horizontal' />
                        </ScrollArea>
                      </div>

                      <div className='mt-6 space-y-1'>
                        <h2 className='text-2xl font-semibold tracking-tight'>Made for You</h2>

                        <p className='text-sm text-muted-foreground'>
                          Your personal playlists. Updated daily.
                        </p>
                      </div>

                      <Separator className='my-4' />

                      <div className='relative'>
                        <ScrollArea>
                          <div className='flex space-x-4 pb-4'>
                            {madeForYouAlbums.map(album => (
                              <AlbumArtwork
                                album={album}
                                aspectRatio='square'
                                className='w-[150px]'
                                height={150}
                                key={album.name}
                                width={150}
                              />
                            ))}
                          </div>

                          <ScrollBar orientation='horizontal' />
                        </ScrollArea>
                      </div>
                    </TabsContent>

                    <TabsContent
                      className='h-full flex-col border-none p-0 data-[state=active]:flex'
                      value='podcasts'>
                      <div className='flex items-center justify-between'>
                        <div className='space-y-1'>
                          <h2 className='text-2xl font-semibold tracking-tight'>New Episodes</h2>

                          <p className='text-sm text-muted-foreground'>
                            Your favorite podcasts. Updated daily.
                          </p>
                        </div>
                      </div>

                      <Separator className='my-4' />

                      <PodcastEmptyPlaceholder />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
