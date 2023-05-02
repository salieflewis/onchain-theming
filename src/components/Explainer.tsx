export function Explainer() {
  return (
    <div className="explainer bg-white text-black px-4 sm:px-6 py-4 rounded-xl drop-shadow-sm border-[1px] border-[#f6f6f6] max-w-md mb-48 m-8">
      <span className="text-[16px]">
        This is an open source implementation of onchain theming. This site
        reads styling parameters from a JSON file hosted on IPFS.
      </span>
      <br />
      <br />
      <span className="text-[16px]">
        Open the styling drawer on the left to adjust the parameters that
        dictate the theming of this app.
      </span>
    </div>
  );
}
