export const HeaderSectionForPage = ({ title, backButton = false }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b w-full h-20">
      <div className="w-10">{backButton}</div>
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="w-10"></div> {/* Espaçador para manter centralizado */}
    </div>
  );
};
