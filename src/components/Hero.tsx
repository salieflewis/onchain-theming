import { Palette } from './Palette';
import { SaveChanges } from './SaveChanges';

export function Hero() {
  return (
    <div className='theming-test__hero container min-w-full min-h-screen flex flex-col'>
      <div className='mx-auto my-auto pb-72'>
        <div className='min-w-xl drop-shadow-xl bg-white px-4 py-4 border-2 border-[#f6f6f6] rounded-xl'>
          <Palette />
          <SaveChanges />
        </div>
      </div>
    </div>
  );
}
