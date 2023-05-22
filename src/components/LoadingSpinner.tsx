interface Props {
  fullScreen?: boolean;
}

export default function LoadingSpinner({ fullScreen = false }: Props) {
  return (
    <div
      className={`flex justify-center items-center ${
        fullScreen ? "h-screen" : ""
      }`}
    >
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-teal-500"></div>
    </div>
  );
}
