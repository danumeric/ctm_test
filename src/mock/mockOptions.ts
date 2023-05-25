import { IOption } from '@/models/options.model'

export const optionsSupply: IOption[] = [
  {
    code: 0,
    description: 'Формируется',
  },
  {
    code: 10,
    description: 'Товар прибыл',
  },
  {
    code: 20,
    description: 'Товар прибыл (срочная поставка)',
  },
  {
    code: 30,
    description: 'Оформление ДТ',
  },
  {
    code: 40,
    description: 'ДТ выпущена',
  },
  {
    code: 50,
    description: 'Поставка закрыта',
  },
]

export const optionsMoving: IOption[] = [
  {
    id: 1,
    description: 'Импорт',
  },
  {
    id: 2,
    description: 'Экспорт',
  },
]
