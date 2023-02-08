export function Palette() {
  return (
    <div className='theming-test__palette max-w-sm mx-auto my-auto drop-shadow-xl rounded-xl px-8 py-4'>
      <div className='flex flex-col gap-y-4'>
        <div className='flex items-center gap-x-4 text-xl'>
          <label id='background'>Choose a background color</label>
          <input id='background' type='color' />
        </div>
        <div className='flex items-center gap-x-4 text-xl'>
          <label id='text'>Choose a text color</label>
          <input id='text' type='color' />
        </div>
      </div>
    </div>
  );
}
