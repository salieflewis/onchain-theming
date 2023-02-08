import { Navigation, Hero } from '../components';
import { ThemeProvider } from '../context/ThemeProvider';

function Page() {
  return (
    <div>
      <ThemeProvider themeIndex={4}>
        <Navigation />
        <Hero />
      </ThemeProvider>
    </div>
  );
}

export default Page;
