import NextTopLoader, { NextTopLoaderProps } from 'nextjs-toploader';

export type TopLoaderProps = NextTopLoaderProps;

export function TopLoader(props: TopLoaderProps) {
  const {
    color = '#ffffff',
    initialPosition = 0.008,
    height = 3,
    crawl = true,
    showSpinner = false,
    easing = 'ease',
    speed = 200,
    shadow,
    zIndex = 999999999999999,
  } = props;

  return (
    <NextTopLoader
      color={color}
      initialPosition={initialPosition}
      height={height}
      crawl={crawl}
      showSpinner={showSpinner}
      easing={easing}
      speed={speed}
      zIndex={zIndex}
      {...(shadow ? { shadow } : { shadow: `0 0 10px ${color},0 0 5px ${color}` })}
    />
  );
}
