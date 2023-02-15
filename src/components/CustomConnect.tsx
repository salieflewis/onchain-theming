import { ConnectKitButton } from 'connectkit';

export function CustomConnect() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <button
            className='bg-white text-black px-4 sm:px-6 py-2 rounded-2xl hover:bg-[#F6F7F9] drop-shadow-sm border-[1px] border-[#f6f6f6]'
            onClick={show}
          >
            <span className='text-[16px]'>
              {isConnected ? ensName ?? truncatedAddress : 'Connect wallet'}
            </span>
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
