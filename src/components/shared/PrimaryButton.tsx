type Props = {
  title: string;
  onClick: () => void;
};

export const PrimaryButton = ({ title, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="focus:outline-none group relative mb-8 flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {title}
    </div>
  );
};
