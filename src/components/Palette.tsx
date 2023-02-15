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
    <div className='flex flex-col gap-y-4 border-2 border-[#f6f6f6] py-4 px-6 rounded-xl'>
      <div className='flex justify-between items-center gap-x-32 text-lg'>
        <label>Background</label>
        <input
          id='background'
          type='color'
          className='theming-test__color-picker'
          value={background}
          onChange={(e) => setBackground(e.target.value)}
        />
      </div>
      <div className='flex justify-between  items-center gap-x-4 text-lg'>
        <label>Text</label>
        <input
          id='text'
          type='color'
          className='theming-test__color-picker'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className='flex justify-between  items-center gap-x-4 text-lg'>
        <label>Border</label>
        <input
          id='border'
          type='color'
          className='theming-test__color-picker'
          value={border}
          onChange={(e) => setBorder(e.target.value)}
        />
      </div>
      <div className='flex justify-between items-center gap-x-4 text-lg'>
        <label>Accent</label>
        <input
          id='accent'
          type='color'
          className='theming-test__color-picker'
          value={accent}
          onChange={(e) => setAccent(e.target.value)}
        />
      </div>
      <div className='flex justify-between  items-center gap-x-4 text-lg'>
        <label>Accent text</label>
        <input
          id='accentText'
          type='color'
          className='theming-test__color-picker'
          value={accentText}
          onChange={(e) => setAccentText(e.target.value)}
        />
      </div>
    </div>
  );
}
