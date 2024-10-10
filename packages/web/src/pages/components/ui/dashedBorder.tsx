export function MovingBorder({ children, color }: { children: JSX.Element, color: string }) {
  const borderColor = color;

  return (
    <div className="mx-auto w-full items-center justify-center m-2 p-2">
      <div className={`relative z-10 flex w-full items-center overflow-hidden p-[3px]`}>
        {/* Spinning Background Layer */}
        <div className={`animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(${borderColor}_20deg,transparent_120deg)] overflow-hidden z-0`} />
        
        {/* Inner Content with Transparent Background */}
        <div className="relative z-10 w-full bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}
