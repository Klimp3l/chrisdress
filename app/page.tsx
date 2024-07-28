import Image from 'next/image';
import { dancing } from './fonts';

import chroma from 'chroma-js';

export default function Home() {
  const classes = [
    {
      'class': 'Amarelo',
      'colors': [
        '#ffd500',
        '#ffdc2e',
        '#ffe761',
        '#ffea76',
        '#fff394'
      ]
    },
    {
      'class': 'Laranja',
      'colors': [
        '#dc6601',
        '#e27602',
        '#e88504',
        '#ec9006',
        '#ee9727'
      ]
    },
    {
      'class': 'Terracota',
      'colors': [
        '#883000',
        '#793802',
        '#944000',
        '#813f0b',
        '#bf5700'
      ]
    },
    {
      'class': 'Vermelho',
      'colors': [
        '#c30010',
        '#d1001f',
        '#de0a26',
        '#f01e2c',
        '#ff2c2c',
        '#771713',
        '#851a15',
        '#9a1e18',
        '#af231c',
        '#dd372f'
      ]
    },
    {
      'class': 'Rosa',
      'colors': [
        '#bb437e',
        '#d24787',
        '#e44b8d',
        '#e2619f',
        '#e27bb1',
        '#7e1037',
        '#c14e76',
        '#df7da6',
        '#f7b2cf',
        '#f99dbc'
      ]
    },
    {
      'class': 'Roxo',
      'colors': [
        '#6b1371',
        '#913781',
        '#a84296',
        '#cd8ec0',
        '#e1bbd9',
        '#4b1c71',
        '#7f4ca5',
        '#b57edc',
        '#dbb6ee',
        '#dbbcdf'
      ]
    },
    {
      'class': 'Azul',
      'colors': [
        '#000080',
        '#192586',
        '#27379b',
        '#384bb4',
        '#3f54be',
        '#1d2951',
        '#003152',
        '#588bae',
        '#57a0d3',
        '#79baec',
        '#18848e',
        '#1a98a6',
        '#1dadc0',
        '#1fbdd2',
        '#33c7d8'
      ]
    },
    {
      'class': 'Verde',
      'colors': [
        '#20331b',
        '#414833',
        '#656d4a',
        '#6d712e',
        '#a2a569',
        '#356258',
        '#3a7267',
        '#3f8276',
        '#448f82',
        '#509f94',
        '#035718',
        '#378552',
        '#008631',
        '#00ab41',
        '#00c04b'
      ]
    },
    {
      'class': 'Marrom',
      'colors': [
        '#5b1f00',
        '#66280a',
        '#713112',
        '#7c3b1a',
        '#9a5833'
      ]
    }
  ];

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
                <div key={item.class}>
                  <span className={`${dancing.className} text-2xl text-[#535353]`}>{item.class}</span>
                  <div className='grid grid-cols-5 gap-1'>
                    {
                      orderColors(item.colors).map((color) => (
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
