import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useOutletContext } from 'react-router-dom'

// zod
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Components
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Alert } from '../../components/Alert'
import { RadioButton } from '../../components/RadioButton'

// Functions
import { desenharRetaDDA, desenharRetaPM, setLines, clear } from '../../functions'

// Icons
import { PaintBrushIcon, TrashIcon } from '@heroicons/react/24/solid'

const createUserFormSchema = z.object({
  posX: z.coerce.number()
    .min(-400, "Valor mínimo: -400")
    .max(400, "Valor máximo: 400"),
  posY: z.coerce.number()
    .min(-300, "Valor mínimo: -300")
    .max(300, "Valor máximo: 300"),
  posX2: z.coerce.number()
    .min(-400, "Valor mínimo: -400")
    .max(400, "Valor máximo: 400"),
  posY2: z.coerce.number()
    .min(-300, "Valor mínimo: -300")
    .max(300, "Valor máximo: 300")
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

export function Reta() {

  const [value, setValue] = useState("DDA");
  const [message, setMessage] = useState<string | null>()
  const [line, setLine] = useState(false)

  const canvasContext = useOutletContext<CanvasRenderingContext2D>()

  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })

  function createUser({ posX, posX2, posY, posY2 }: CreateUserFormData) {
    if (!line) {
      setLines(canvasContext)
    }
    setLine(true)
    value === "DDA"
      ? desenharRetaDDA(canvasContext, posX, posY, posX2, posY2)
      : desenharRetaPM(canvasContext, posX, posY, posX2, posY2);
    setMessage(`Desenhado usando o algorítmo ${value}.`);
  }

  return (
    <div className='flex flex-col'>
      <span className='text-3xl mb-2'>Desenhar Reta</span>
      <hr className="h-px bg-gray-100 border-0 mb-4" />
      <div className='flex flex row gap-3 mb-5'>
        <RadioButton
          name='Radio'
          label='DDA'
          onClick={() => setValue("DDA")}
          defaultChecked
        />
        <RadioButton
          name='Radio'
          label='Ponto médio'
          onClick={() => setValue("ponto médio")}
        />
      </div>
      {message && <Alert message={message} />}
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
          <Input
            placeholder='Ponto X2'
            type='number'
            step="any"
            required
            {...register('posX2')}
            error={errors.posX2}
          />
          <Input
            placeholder='Ponto Y2'
            type='number'
            step="any"
            required
            {...register('posY2')}
            error={errors.posY2}
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
              setMessage(null)
              setLine(false)
            }}
          />
        </div>
      </form>
    </div>
  )
}