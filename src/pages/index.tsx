import { Header, Hero, Drawer } from '../components';
import { ThemeProvider } from '../context/ThemeProvider';

function Page() {
  // @ts-ignore
  const platformIndex = process.env.NEXT_PUBLIC_PLATFORM_INDEX as number;

  return (
    <div>
      <ThemeProvider platformIndex={platformIndex}>
        <div className='theming-test__site'>
          <Header />
          <Hero />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default Page;
