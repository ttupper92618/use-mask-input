import Inputmask, { Options as InputMaskOptions } from 'inputmask'
import { useEffect, useRef } from 'react'

interface UseInputMaskOptions {
  mask: InputMaskOptions['mask']
  register?(element: HTMLElement): void
  options?: InputMaskOptions
}

const typefreeInputMask = Inputmask as any;
const inputMask = typefreeInputMask.default ? typefreeInputMask.default : Inputmask;

const useInputMask = (props: UseInputMaskOptions) => {
  const { mask, register, options } = props

  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const maskInput = inputMask({
      mask,
      ...options
    })

    maskInput.mask(ref.current)

    if (register && ref.current) {
      register(ref.current)
    }
  }, [mask, register, options])

  return ref
}

export default useInputMask
