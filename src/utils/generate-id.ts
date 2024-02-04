import { GenerateNumber } from './generate-number'

const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789'

const GenerateUniqueId = (length: number) => {
  let id: string = ''
  for (let i = 0; i < length; i++) {
    if (GenerateNumber(1, 3) == 1) {
      id += alphabet[GenerateNumber(0, alphabet.length)].toUpperCase()
    } else {
      id += alphabet[GenerateNumber(0, alphabet.length)]
    }
  }
  return id
}

export { GenerateUniqueId }
