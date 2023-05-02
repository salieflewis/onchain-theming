import { Header, Hero, Drawer } from '../components';
import { ThemeProvider } from '../context/ThemeProvider';

function Page() {
  // @ts-ignore
  const platformIndex = process.env.NEXT_PUBLIC_PLATFORM_INDEX as number;

  return (
    <div>
      <ThemeProvider targetAddress='0x1ed51f1c554d132b5f62bf7b510ea4bd3e7f004e'>
        <div className='theming-test__site'>
          <Header />
          <Hero />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default Page;
