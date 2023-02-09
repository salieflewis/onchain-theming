import { Palette } from './Palette';
import { SaveChanges } from './SaveChanges';

export function Hero() {
  return (
    <div className='theming-test__hero container min-w-full min-h-screen flex flex-col'>
      <div className='mx-auto my-auto pb-72'>
        <Palette />
        <SaveChanges />
      </div>
    </div>
  );
}
