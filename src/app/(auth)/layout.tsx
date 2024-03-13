interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen items-center justify-center container mx-auto">
      {children}
    </div>
  );
};

export default layout;
