import { Header, Hero } from '../components';
import { ThemeProvider } from '../context/ThemeProvider';

function Page() {
  return (
    <div>
      <ThemeProvider targetAddress='0x16Dd63A4fC9EfB5f45129488A1966CD4cA97B11d'>
        <div className='theming-test__site'>
          <Header />
          <Hero />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default Page;
