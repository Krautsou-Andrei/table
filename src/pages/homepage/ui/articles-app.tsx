import { Link } from 'react-router-dom'

import { AppIcon } from '@/components/ui/app-icon'

import { ROUTES } from '@/consts/routes'
import { TEXT } from '@/consts/text'

interface ArticlesAppProps {
  styles: CSSModuleClasses
}

export const ArticlesApp = ({ styles }: ArticlesAppProps) => {
  return (
    <Link to={ROUTES.GUIDES}>
      <div
        className={`box-shadow-articles relative flex h-[88px] items-center overflow-hidden rounded-2xl bg-cover bg-center ${styles['background-articles']}`}
      >
        <div className='background-gradient-articles absolute left-0 top-0 h-full w-4/5'></div>
        <p className='z-10 pl-8 text-xl font-bold uppercase leading-[122%]'>{TEXT.GUIDES_AND_ARTICLES}</p>
        <AppIcon className='absolute right-2 top-1 z-10' name='app/cat_read' width={147} height={92} />
      </div>
    </Link>
  )
}
