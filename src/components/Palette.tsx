import * as React from 'react';
import { useThemeContext } from '../context/ThemeProvider';

export function Palette() {
//   const { text } = useThemeContext()
  /**
   * Set state variables for the configurable properties
   */
  const [background, setBackground] = React.useState<string>('');
  const [text, setText] = React.useState<string>('');
  const [accent, setAccent] = React.useState<string>('');
  const [accentText, setAccentText] = React.useState<string>('');
  const [border, setBorder] = React.useState<string>('');
  /**
   * Update CSS variables to reflect the state of the color pickers
   */
  document.documentElement.style.setProperty('--background', background);
  document.documentElement.style.setProperty('--text', text);
  document.documentElement.style.setProperty('--accent', accent);
  document.documentElement.style.setProperty('--accentText', accentText);
  document.documentElement.style.setProperty('--border', border);

  return (
    <div className='theming-test__palette max-w-sm drop-shadow-xl rounded-xl px-8 py-4'>
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
            id='border'
            type='color'
            value={border}
            onChange={(e) => setBorder(e.target.value)}
          />
        </div>
        <div className='flex justify-between items-center gap-x-4 text-xl'>
          <label>Accent color</label>
          <input
            id='accent'
            type='color'
            value={accent}
            onChange={(e) => setAccent(e.target.value)}
          />
        </div>
        <div className='flex justify-between  items-center gap-x-4 text-xl'>
          <label>Accent text color</label>
          <input
            id='accentText'
            type='color'
            value={accentText}
            onChange={(e) => setAccentText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
