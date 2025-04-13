export const FoodSlide = () => {
  return (
    <div className='px-8 pb-[102px] pt-8'>

      <div>
        <div className='mb-1 font-bold uppercase leading-[122%]'>Гайд по вкусным местам</div>
        <div className='text-text-secondary mb-8 text-[32px] font-bold uppercase leading-[122%]'>от @kotikgo_bot</div>
      </div>

      
      <div className='mb-6 w-full'>
        <img 
          src="/food-guide.jpg" 
          alt="Гид по вкусным местам Порту" 
          className='w-full rounded-2xl object-cover shadow-md'
        />
      </div>

      <div className='mb-4 w-full font-bold leading-[122%]'>
        <div>Тут не только мишленовские рестораны, но и пекарни, рынки</div>
        <div>и места, которые вам точно придутся по вкусу и карману)</div>
      </div>

      <div className='space-y-6'>
        <div>
          <a href="https://maps.app.goo.gl/4hPunD4oLYKGKVEBA" target="_blank" rel="noopener noreferrer" className='text-text-third font-bold hover:underline'>
            1. Brasão Antas
          </a>
          <div className='text-sm'>
            Почему интересно: Известен своими традиционными португальскими блюдами, особенно франсезиньями.
            <br/>Средний чек: 15-25 евро
            <br/>Отзыв: Персонал был вежливым, блюда принесли быстро и все было очень вкусно!
          </div>
        </div>

        <div>
          <a href="https://maps.app.goo.gl/7rcz6bnZYJqta5BZ6" target="_blank" rel="noopener noreferrer" className='text-text-third font-bold hover:underline'>
            2. Mercado do Bolhão
          </a>
          <div className='text-sm'>
            Почему интересно: Исторический рынок, где можно попробовать свежие местные продукты.
            <br/>Отзыв: Можно с бокалом вина пройтись по рядам и купить много интересных продуктов.
          </div>
        </div>

        <div>
          <a href="https://maps.app.goo.gl/KN5KUfqb2fNqq7Gv8" target="_blank" rel="noopener noreferrer" className='text-text-third font-bold hover:underline'>
            3. Pedro Lemos Restaurante (одна звезда Мишлена)
          </a>
          <div className='text-sm'>
            Почему интересно: Один из лучших ресторанов Порту, отмеченный звездой Мишлен.
            <br/>Средний чек: 50 евро
            <br/>Отзыв: Великолепный ресторан. Сервис, атмосфера и невероятная еда.
          </div>
        </div>

        {/* Остальные места аналогично */}
        <div>
          <a href="https://maps.app.goo.gl/AbJLvxfnoNfkR4NW6" target="_blank" rel="noopener noreferrer" className='text-text-third font-bold hover:underline'>
            4. Manteigaria
          </a>
          <div className='text-sm'>
            Почему интересно: Пекарня знаменита своими пастель де ната.
            <br/>Средний чек: 5-10 евро
          </div>
        </div>

        <div>
          <a href="https://maps.app.goo.gl/gvLYrzvJJBhh8sFZA" target="_blank" rel="noopener noreferrer" className='text-text-third font-bold hover:underline'>
            5. Taberna dos Mercadores
          </a>
          <div className='text-sm'>
            Почему интересно: Уютная таверна с аутентичной атмосферой.
            <br/>Средний чек: 25 евро
          </div>
        </div>
      </div>

      <div className='mt-8 w-full font-bold uppercase leading-[122%]'>
        <div className='text-text-third'>Приятного аппетита, котики!</div>
      </div>
    </div>
  )
}