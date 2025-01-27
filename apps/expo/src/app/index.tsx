import React, { useState } from 'react'
import { Button, Pressable, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, Stack } from 'expo-router'
import { FlashList } from '@shopify/flash-list'

import type { RouterOutputs } from '~/utils/api'
import { api } from '~/utils/api'
import { useSignIn, useSignOut, useUser } from '~/utils/auth'

const PostCard = ({
    onDelete,
    post
  }: {
    readonly onDelete: () => void
    readonly post: RouterOutputs['post']['all'][number]
  }) => (
    <View className='flex flex-row rounded-2xl bg-muted p-4'>
      <View className='grow'>
        <Link
          asChild
          href={{
            params: { id: post.id },
            pathname: '/post/[id]'
          }}>
          <Pressable className=''>
            <Text className='text-xl font-semibold text-primary'>{post.title}</Text>

            <Text className='mt-2 text-foreground'>{post.content}</Text>
          </Pressable>
        </Link>
      </View>

      <Pressable onPress={onDelete}>
        <Text className='font-bold uppercase text-primary'>Delete</Text>
      </Pressable>
    </View>
  ),
  CreatePost = () => {
    const utils = api.useUtils(),
      [title, setTitle] = useState(''),
      [content, setContent] = useState(''),
      { error, mutate } = api.post.create.useMutation({
        async onSuccess() {
          setTitle('')
          setContent('')
          await utils.post.all.invalidate()
        }
      })
    return (
      <View className='flex gap-2'>
        <TextInput
          className='items-center rounded-xl border border-input bg-background p-3 text-lg leading-tight text-foreground'
          onChangeText={setTitle}
          placeholder='Title'
          value={title}
        />

        {error?.data?.zodError?.fieldErrors.title ? (
          <Text className='mb-2 text-destructive'>{error.data.zodError.fieldErrors.title}</Text>
        ) : null}

        <TextInput
          className='items-center rounded-xl border border-input bg-background p-3 text-lg leading-tight text-foreground'
          onChangeText={setContent}
          placeholder='Content'
          value={content}
        />

        {error?.data?.zodError?.fieldErrors.content ? (
          <Text className='mb-2 text-destructive'>{error.data.zodError.fieldErrors.content}</Text>
        ) : null}

        <Pressable
          className='flex items-center rounded-xl bg-primary py-4'
          onPress={() => mutate({ content, title })}>
          <Text className='text-background'>Create</Text>
        </Pressable>

        {error?.data?.code === 'UNAUTHORIZED' && (
          <Text className='mt-2 text-destructive'>You need to be logged in to create a post</Text>
        )}
      </View>
    )
  },
  MobileAuth = () => {
    const user = useUser(),
      signIn = useSignIn(),
      signOut = useSignOut()
    return (
      <>
        <Text className='pb-2 text-center text-foreground'>{user?.name ?? 'Not logged in'}</Text>

        <Button
          onPress={() => (user ? signOut() : signIn())}
          title={user ? 'Sign Out' : 'Sign In With Google'}
        />
      </>
    )
  }

export default function Index() {
  const utils = api.useUtils(),
    postQuery = api.post.all.useQuery(),
    deletePostMutation = api.post.delete.useMutation({
      onSettled: () => utils.post.all.invalidate()
    })
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: 'Home Page' }} />

      <View className='size-full px-1'>
        <CreatePost />

        <View className='py-2'>
          <Text className='font-semibold italic text-primary'>Press on a post</Text>
        </View>

        <FlashList
          ItemSeparatorComponent={() => <View className='h-2' />}
          data={postQuery.data}
          estimatedItemSize={20}
          renderItem={p => (
            <PostCard onDelete={() => deletePostMutation.mutate(p.item.id)} post={p.item} />
          )}
        />

        <MobileAuth />
      </View>
    </SafeAreaView>
  )
}
