import Image from 'next/image';
import { dancing } from './fonts';

import { db } from '@/lib/db';

import chroma from 'chroma-js';

export default async function Home() {
  const classes = await db.class.findMany({
    include: {
      colors: {
        select: {
          hex: true,
        }
      }
    }
  });

  function orderColors(colors: string[]) {
    return colors.sort((a, b) => {
      // Converter as cores para valores de luminância
      const luminanciaA = chroma(a).luminance();
      const luminanciaB = chroma(b).luminance();
  
      // Comparar as luminâncias
      return luminanciaA - luminanciaB;
    });
  }

  return (
      <main className="h-full w-full p-5">
        <div className="flex flex-col rounded-lg m-auto max-w-96 bg-cloud-dancer text-green-950 shadow-[0px_0px_15px_10px_rgba(0,0,0,0.1)]">
          <div className='flex items-center mt-2 justify-center w-full h-52 relative'>
            <div className='absolute z-10 text-white cursive'>
              <span className={`${dancing.className} text-5xl`}>Madrinhas</span>
            </div>
            <Image 
              src='/fundo.jpg'
              alt="fundo"
              layout='fill'
              className='w-full h-full'
            />
          </div>
          <div className='flex flex-col p-5 gap-5'>
            {
              classes.map((item) => (
                <div key={item.name}>
                  <span className={`${dancing.className} text-2xl text-[#535353]`}>{item.name}</span>
                  <div className='grid grid-cols-5 gap-1'>
                    {
                      orderColors(item.colors.map(x => x.hex)).map((color) => (
                        <div key={color} className='flex flex-col gap-1 items-center justify-center'> 
                          <div style={{ backgroundColor: color }} className="w-10 h-10 rounded-full"/>
                          <span className='text-xs'>{color}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </main>
  );
}
