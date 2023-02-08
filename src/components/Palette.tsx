import * as React from 'react';

export function Palette() {
  /**
   * Set state variables for the configurable properties
   */
  const [background, setBackground] = React.useState<string>('');
  const [text, setText] = React.useState<string>('');
  const [border, setBorder] = React.useState<string>('');
  /**
   * Update CSS variables to reflect the state of the color pickers
   */
  document.documentElement.style.setProperty('--background', background);
  document.documentElement.style.setProperty('--text', text);
  document.documentElement.style.setProperty('--border', border);

  return (
    <div className='theming-test__palette max-w-sm mx-auto my-auto drop-shadow-xl rounded-xl px-8 py-4'>
      <div className='flex flex-col gap-y-4'>
        <div className='flex justify-between items-center gap-x-4 text-xl'>
          <label>Background color</label>
          <input
            id='background'
            type='color'
            value={background}
            onChange={(e) => setBackground(e.target.value)}
          />
        </div>
        <div className='flex justify-between  items-center gap-x-4 text-xl'>
          <label>Text color</label>
          <input
            id='text'
            type='color'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='flex justify-between  items-center gap-x-4 text-xl'>
          <label>Border color</label>
          <input
            id='text'
            type='color'
            value={border}
            onChange={(e) => setBorder(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
