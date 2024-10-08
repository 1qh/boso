import Image from 'next/image'
import { PlusCircledIcon } from '@radix-ui/react-icons'

import { cn } from '@a/ui'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from '@a/ui/context-menu'

import type { Album } from '../data/albums'
import { playlists } from '../data/playlists'

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly album: Album
  readonly aspectRatio?: 'portrait' | 'square'
  readonly height?: number
  readonly width?: number
}

export const AlbumArtwork = ({
  album,
  aspectRatio = 'portrait',
  className,
  height,
  width,
  ...props
}: AlbumArtworkProps) => (
  <div className={cn('space-y-3', className)} {...props}>
    <ContextMenu>
      <ContextMenuTrigger>
        <div className='overflow-hidden rounded-md'>
          <Image
            alt={album.name}
            className={cn(
              'size-auto object-cover transition-all hover:scale-105',
              aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
            )}
            height={height}
            src={album.cover}
            width={width}
          />
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent className='w-40'>
        <ContextMenuItem>Add to Library</ContextMenuItem>

        <ContextMenuSub>
          <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>

          <ContextMenuSubContent className='w-48'>
            <ContextMenuItem>
              <PlusCircledIcon className='mr-2 size-4' />
              New Playlist
            </ContextMenuItem>

            <ContextMenuSeparator />

            {playlists.map(playlist => (
              <ContextMenuItem key={playlist}>
                <svg
                  className='mr-2 size-4'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path d='M21 15V6M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 12H3M16 6H3M12 18H3' />
                </svg>

                {playlist}
              </ContextMenuItem>
            ))}
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSeparator />

        <ContextMenuItem>Play Next</ContextMenuItem>

        <ContextMenuItem>Play Later</ContextMenuItem>

        <ContextMenuItem>Create Station</ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem>Like</ContextMenuItem>

        <ContextMenuItem>Share</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>

    <div className='space-y-1 text-sm'>
      <h3 className='font-medium leading-none'>{album.name}</h3>

      <p className='text-xs text-muted-foreground'>{album.artist}</p>
    </div>
  </div>
)
