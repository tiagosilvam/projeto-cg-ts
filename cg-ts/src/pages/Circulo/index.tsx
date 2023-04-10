import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useOutletContext } from 'react-router-dom'

// zod
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Components
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

// Functions
import { clear, desenharPontoMedioCirculo, setLines } from '../../functions'

// Icons
import { PaintBrushIcon, TrashIcon } from '@heroicons/react/24/solid'

const createUserFormSchema = z.object({
  raio: z.coerce.number()
    .min(1, "Valor mínimo: 1")
    .max(300, "Valor máximo: 300")
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

export function Circulo() {

  const [line, setLine] = useState(false)
  const canvasContext = useOutletContext<CanvasRenderingContext2D>()

  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })

  function createUser({ raio }: CreateUserFormData) {
    if (!line) {
      setLines(canvasContext)
    }
    setLine(true)
    desenharPontoMedioCirculo(canvasContext, raio)
  }

  return (
    <div className='flex flex-col'>
      <span className='text-3xl mb-10'>Desenhar Circulo</span>
      <form className='flex flex-col gap-4 items-center' onSubmit={handleSubmit(createUser)}>
        <div className="grid gap-2 md:grid-cols-2">
          <Input
            placeholder='Raio'
            type='number'
            step="any"
            required
            {...register('raio')}
            error={errors.raio}
          />
        </div>
        <div className='flex flex-col w-3/6'>
          <Button
            name="Desenhar"
            type="submit"
            icon={<PaintBrushIcon className="w-6 h-6 mr-3" />}
            color="bg-blue-500"
            hover="hover:bg-blue-900"
          />
          <Button
            name="Limpar"
            type="button"
            icon={<TrashIcon className="w-6 h-6 mr-3" />}
            color="bg-emerald-500"
            hover="hover:bg-emerald-600"
            onClick={() => {
              clear(canvasContext)
              setLine(false)
            }}
          />
        </div>
      </form>
    </div>
  )
}