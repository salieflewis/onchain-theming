import * as React from 'react';
import { useThemeContext } from '../context/ThemeProvider';

export function Palette() {
  /**
   * Grab the state variables and setter functions from the ThemeProvider
   */
  const {
    background,
    setBackground,
    text,
    setText,
    accent,
    setAccent,
    accentText,
    setAccentText,
    border,
    setBorder,
  } = useThemeContext();

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
