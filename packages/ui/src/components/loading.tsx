interface Props {
  size?: number;
}

export function Loading(props: Props) {
  const { size = 48 } = props;

  return (
    <div
      style={{ width: size, height: size }}
      className="flex items-center justify-center rounded-full bg-primary"
    >
      <div
        style={{ width: size - size * 0.3, height: size - size * 0.3 }}
        className="flex animate-bounce items-center justify-center"
      >
        MF
      </div>
    </div>
  );
}
