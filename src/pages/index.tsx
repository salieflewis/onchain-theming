import { Navigation, Hero } from '../components';
import { ThemeProvider } from '../context/ThemeProvider';

function Page() {
  return (
    <div>
      <ThemeProvider platformIndex={2}>
        <Navigation />
        <Hero />
      </ThemeProvider>
    </div>
  );
}

export default Page;
