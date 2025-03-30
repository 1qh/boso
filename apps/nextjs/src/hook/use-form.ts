import type { FieldValues, UseFormProps } from 'react-hook-form'
import type { ZodType, ZodTypeDef } from 'zod'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useForm } from 'react-hook-form'

const useF = <TOut extends FieldValues, TDef extends ZodTypeDef, TIn extends FieldValues>(
  props: Omit<UseFormProps<TIn>, 'resolver'> & { schema: ZodType<TOut, TDef, TIn> }
) => useForm<TIn, unknown, TIn>({ ...props, resolver: standardSchemaResolver(props.schema, undefined) })

export default useF
