import { CreatedTabs } from '../ui/created-tabs'
import { IGoTabs } from '../ui/i-co-tabs'
import { HistoryTabs } from '../ui/history-tabs'
import { LiderBoardTabs } from '../ui/lider-board-tabs'

import { TEXT } from '@/consts/text'
import { VARIABLES } from '@/consts/variables'
import { CellPaws } from '../ui/cell-paws'

export const TABS = [
  { id: 1, title: `${TEXT.I_GO}...`, value: VARIABLES.TABS_I_GO },
  { id: 2, title: TEXT.CREATED, value: VARIABLES.TABS_CREATED },
  { id: 3, title: TEXT.HISTORY, value: VARIABLES.TABS_HISTORY },
  { id: 4, title: TEXT.LIDER_BOARD, value: VARIABLES.TABS_LIDER_BOARD },
]

export const TABS_PANEL = [
  { id: 1, value: VARIABLES.TABS_I_GO, component: <IGoTabs /> },
  { id: 2, value: VARIABLES.TABS_CREATED, component: <CreatedTabs /> },
  { id: 3, value: VARIABLES.TABS_HISTORY, component: <HistoryTabs /> },
  { id: 4, value: VARIABLES.TABS_LIDER_BOARD, component: <LiderBoardTabs /> },
]

export const USERS_TABLE_HEADERS = [
  {
    id: 1,
    conmponent: '№',
  },
  {
    id: 2,
    conmponent: TEXT.USER,
  },
  {
    id: 3,
    conmponent: <CellPaws title={TEXT.PAWS} />,
  },
]

export const USERS = [
  {
    id: 1,
    name: 'Андрей',
    balances: 100,
  },
  {
    id: 2,
    name: 'Мария',
    balances: 150,
  },
  {
    id: 3,
    name: 'Сергей',
    balances: 200,
  },
  {
    id: 4,
    name: 'Ольга',
    balances: 250,
  },
  {
    id: 5,
    name: 'Дмитрий',
    balances: 300,
  },
  {
    id: 6,
    name: 'Елена',
    balances: 350,
  },
  {
    id: 7,
    name: 'Игорь',
    balances: 400,
  },
  {
    id: 8,
    name: 'Анна',
    balances: 450,
  },
  {
    id: 9,
    name: 'Виктор',
    balances: 500,
  },
  {
    id: 10,
    name: 'Татьяна',
    balances: 550,
  },
]
