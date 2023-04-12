import { useForm } from 'react-hook-form'
import { useOutletContext } from 'react-router-dom'

// zod
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Components
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

// Functions
import { clear, setPixel } from '../../functions'

// Icons
import { PaintBrushIcon, TrashIcon } from '@heroicons/react/24/solid'

type CreateUserFormData = z.infer<typeof createUserFormSchema>

const createUserFormSchema = z.object({
  posX: z.coerce.number()
    .min(-400, "Valor mínimo: -400")
    .max(400, "Valor máximo: 400"),
  posY: z.coerce.number()
    .min(-300, "Valor mínimo: -300")
    .max(300, "Valor máximo: 300")
})

export function Pixel() {

  const canvasContext = useOutletContext<CanvasRenderingContext2D>()

  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })

  function createUser({ posX, posY }: CreateUserFormData) {
    setPixel(canvasContext, posX, posY)
  }

  return (
    <div className='flex flex-col'>
      <span className='text-3xl mb-2'>Desenhar Pixel</span>
      <hr className="h-px bg-gray-100 border-0 mb-4" />
      <form className='flex flex-col gap-2 items-center' onSubmit={handleSubmit(createUser)}>
        <div className="grid gap-2 md:grid-cols-2">
          <Input
            placeholder='Ponto X'
            type='number'
            step="any"
            required
            {...register('posX')}
            error={errors.posX}
          />
          <Input
            placeholder='Ponto Y'
            type='number'
            step="any"
            required
            {...register('posY')}
            error={errors.posY}
          />
        </div>
        <div className='flex gap-2'>
          <Button
            name="Desenhar"
            type="submit"
            icon={<PaintBrushIcon className="w-6 h-6 mr-3" />}
            color="bg-blue-500"
            hover="hover:bg-blue-600"
          />
          <Button
            name="Limpar"
            type="button"
            icon={<TrashIcon className="w-6 h-6 mr-3" />}
            color="bg-emerald-500"
            hover="hover:bg-emerald-600"
            onClick={() => {
              clear(canvasContext)
            }}
          />
        </div>
      </form>
    </div>
  )
}