import { Navigation, Hero } from '../components';
import { ThemeProvider } from '../context/ThemeProvider';

function Page() {
  // @ts-ignore
  const platformIndex = process.env.NEXT_PUBLIC_PLATFORM_INDEX as number;
  
  return (
    <div>
      <ThemeProvider platformIndex={platformIndex}>
        <Navigation />
        <Hero />
      </ThemeProvider>
    </div>
  );
}

export default Page;
