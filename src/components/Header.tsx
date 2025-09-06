interface HeaderProps {
  mode: 'watermark' | 'merger';
  onModeChange: (mode: 'watermark' | 'merger') => void;
}

function Header({ mode, onModeChange }: HeaderProps) {
  const buttonBaseClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const activeClasses = "bg-blue-600 text-white";
  const inactiveClasses = "bg-gray-200 text-gray-700 hover:bg-gray-300";

  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Photo Tools</h1>
        <nav className="flex space-x-4">
          <button
            onClick={() => onModeChange('watermark')}
            className={`${buttonBaseClasses} ${mode === 'watermark' ? activeClasses : inactiveClasses}`}
          >
            Watermark Tool
          </button>
          <button
            onClick={() => onModeChange('merger')}
            className={`${buttonBaseClasses} ${mode === 'merger' ? activeClasses : inactiveClasses}`}
          >
            Image Merger
          </button>
        </nav>
      </div>
    </header>
  );
}
export default Header;