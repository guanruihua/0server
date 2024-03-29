import { Request, Response } from 'express'
import { LoremIpsum } from 'lorem-ipsum'
import { MAX_SENTENCE } from '../library/config'

// eslint-disable-next-line
export function sentence(
  param: Record<string, any>,
  req: Request,
  res: Response
): Record<string, any> {
  const lorem: any = new LoremIpsum().generateSentences(
    Math.min(parseInt(req.params[0]), MAX_SENTENCE)
  )
  if (req.params[1] === ',') {
    return lorem
      .split('.')
      .map((s: any): string => s.trim() + '.')
      .filter((i: any): boolean => i !== '.')
  }

  return lorem
}

export const sentenceController = {
  get: /\/(\d+)(?:s|sentence|sentences)(,*)$/,
  callback: sentence
}
