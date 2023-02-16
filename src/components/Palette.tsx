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
    fontFamily,
    setFontFamily,
  } = useThemeContext();

  function handleFontChange(e: any) {
    const selectedFont = document.getElementById('fontFamily');
    // @ts-ignore
    setFontFamily(selectedFont.value);
  }

  return (
    <div className='space-y-4'>
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
        <div className='flex justify-between items-center gap-x-4 text-lg'>
          <label>Text</label>
          <input
            id='text'
            type='color'
            className='theming-test__color-picker'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='flex justify-between items-center gap-x-4 text-lg'>
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
        <div className='flex justify-between items-center gap-x-4 text-lg'>
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
      <div className='flex flex-col gap-y-4 border-2 border-[#f6f6f6] py-4 px-6 rounded-xl'>
        <div className='flex justify-between items-center gap-x-4 text-lg'>
          <select
            className='theming-test__dropdown '
            id='fontFamily'
            value={fontFamily}
            onChange={(e) => handleFontChange(e)}
          >
            <option value='Antonio'>Antonio</option>
            <option value='Archivo Narrow'>Archivo Narrow</option>
            <option value='Audiowide'>Audiowide</option>
            <option value='Ballet'>Ballet</option>
            <option value='BioRhyme'>BioRhyme</option>
            <option value='Chicle'>Chicle</option>
            <option value='Chivo Mono'>Chivo Mono</option>
            <option value='Cinzel'>Cinzel</option>
            <option value='Cormorant'>Cormorant</option>
            <option value='Domine'>Domine</option>
            <option value='DynaPuff'>DynaPuff</option>
            <option value='Eczar'>Eczar</option>
            <option value='Frank Ruhl Libre'>Frank Ruhl Libre</option>
            <option value='Grandstander'>Grandstander</option>
            <option value='Hanken Grotesk'>Hanken Grotesk</option>
            <option value='IBM Plex Mono'>IBM Plex Mono</option>
            <option value='IBM Plex Sans'>IBM Plex Sans</option>
            <option value='IBM Plex Serif'>IBM Plex Serif</option>
            <option value='Inconsolata'>Inconsolata</option>
            <option value='Inter'>Inter</option>
            <option value='Jura'>Jura</option>
            <option value='Kreon'>Kreon</option>
            <option value='Literata'>Literata</option>
            <option value='Londrina Solid'>Londrina Solid</option>
            <option value='Lora'>Lora</option>
            <option value='Michroma'>Michroma</option>
            <option value='Montserrat'>Montserrat</option>
            <option value='Mulish'>Mulish</option>
            <option value='Newsreader'>Newsreader</option>
            <option value='Nunito'>Nunito</option>
            <option value='Open Sans'>Open Sans</option>
            <option value='Orbitron'>Orbitron</option>
            <option value='Outfit'>Outfit</option>
            <option value='Oxanium'>Oxanium</option>
            <option value='Playfair Display'>Playfair Display</option>
            <option value='Poppins'>Poppins</option>
            <option value='Quicksand'>Quicksand</option>
            <option value='Raleway'>Raleway</option>
            <option value='Rokkitt'>Rokkitt</option>
            <option value='Rubik'>Rubik</option>
            <option value='Saira'>Saira</option>
            <option value='Sono'>Sono</option>
            <option value='Sora'>Sora</option>
            <option value='Space Grotesk'>Space Grotesk</option>
            <option value='Space Mono'>Space Mono</option>
            <option value='Stick No Bills'>Stick No Bills</option>
            <option value='Unbounded'>Unbounded</option>
            <option value='Unifraktur Maguntia'>Unifraktur Maguntia</option>
            <option value='Vollkorn'>Vollkorn</option>
            <option value='Wallpoet'>Wallpoet</option>
          </select>
        </div>
      </div>
    </div>
  );
}
