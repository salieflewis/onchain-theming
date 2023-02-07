import { Navigation, Hero } from '../components';
import { ThemeProvider } from '../context/ThemeProvider';

function Page() {
  return (
    <ThemeProvider themeIndex={4}>
      <Navigation />
      <Hero />
    </ThemeProvider>
  );
}

export default Page;
