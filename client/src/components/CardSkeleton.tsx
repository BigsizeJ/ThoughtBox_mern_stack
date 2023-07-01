const CardSkeleton = () => {
  return (
    <div
      className="w-[80vw] text-gray-200 bg-[#192f4c] p-5 shadow-lg shadow-gray-900 flex flex-col gap-2
    lg:py-4 lg:w-[28vw] md:w-[75vw] mb-2"
    >
      <div className="w-full flex justify-start  items-center gap-3 animate-pulse">
        <div className="rounded-full w-10 h-9 bg-[rgba(0,0,0,.2)]"></div>
        <div className="flex flex-col gap-y-2 w-full">
          <div className="w-full h-4 animate-pulse bg-[rgba(0,0,0,.2)] rounded-sm"></div>
          <div className="w-full h-3 animate-pulse bg-[rgba(0,0,0,.2)] rounded-sm"></div>
        </div>
      </div>
      <div className="w-full h-20 animate-pulse bg-[rgba(0,0,0,.2)] mt-1 rounded-sm"></div>
      <div className="w-full h-4 animate-pulse bg-[rgba(0,0,0,.2)] mt-1 rounded-sm"></div>
    </div>
  );
};

export default CardSkeleton;
