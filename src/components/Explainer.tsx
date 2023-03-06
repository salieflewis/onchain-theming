export function Explainer() {
  return (
    <div className='explainer bg-white text-black px-4 sm:px-6 py-4 rounded-xl drop-shadow-sm border-[1px] border-[#f6f6f6] max-w-md mb-48'>
      <span className='text-[16px]'>
        This is an open source implementation of onchain theming. This site
        reads styling parameters from a JSON file hosted on IPFS.
      </span>
      <br></br>
      <br></br>
      <span className='text-[16px]'>
        Open the styling drawer on the left to adjust the parameters that
        dictate the theming of this component.
      </span>
      <br></br>
      <br></br>
      <span className='text-[16px]'>
        <a
          className='underline hover:text-[#ACB1B9]'
          href='https://goerli.etherscan.io/address/0xAB90D2aa090a92c4AA7808b84EE261E2a587Adb4#code'
          target='_blank'
          rel='noreferrer'
        >
          {' '}
          Here
        </a>{' '}
        you can find the contract that handles which JSON the site reads from,
        as well as who is allowed to update that information. If you're
        interested in gaining those permissions,{' '}
        <a
          className='underline hover:text-[#ACB1B9]'
          href='https://github.com/salieflewis/onchain-theming/issues/new'
          target='_blank'
          rel='noreferrer'
        >
          open an issue
        </a>{' '}
        and I'll add you to the allowlist.
      </span>
    </div>
  );
}
