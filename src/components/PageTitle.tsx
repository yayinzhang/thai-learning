interface PageTitleProps {
  children: React.ReactNode;
}

export default function PageTitle({ children }: PageTitleProps) {
  return (
    <h1 className="text-4xl font-bold mb-8 text-gray-900">
      {children}
    </h1>
  );
} 