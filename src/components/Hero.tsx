import { useThemeContext } from '../context/ThemeProvider';
import { useWeb3Storage } from '../hooks';

export function Hero() {
  const { themeData } = useThemeContext();

  return (
    <div className='mx-auto flex justify-center'>
      <code>
        <pre>{JSON.stringify(themeData, null, 2)}</pre>
      </code>
    </div>
  );
}
