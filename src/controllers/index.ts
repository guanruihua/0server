export * from './dataBuriedPoint'
export * from './image'
export * from './paragraph'
export * from './sentence'
export * from './single'
export * from './word'
export * from './imgUpload'

import { dataBuriedPointController } from './dataBuriedPoint'
import { imageController } from './image'
import { paragraphController } from './paragraph'
import { sentenceController } from './sentence'
import { singleController } from './single'
import { wordController } from './word'
import { imgUploadController } from './imgUpload'

export const BuiltInController = [
  ...dataBuriedPointController,
  imageController,
  paragraphController,
  sentenceController,
  ...singleController,
  wordController,
  imgUploadController
]
