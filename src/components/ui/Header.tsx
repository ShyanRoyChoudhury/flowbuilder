import { useEffect, useState } from "react";

interface HeaderProps {
  onSave: () => void;
  error: boolean;
}
const Header: React.FC<HeaderProps> = ({ onSave, error }) => {
  const [showError, setShowError] = useState<string | null>("");
  useEffect(() => {
    if (error) {
      setShowError("Cannot show Flow");

      const timeout = setTimeout(() => {
        setShowError(null);
      }, 5000);

      return () => clearTimeout(timeout);
    } else {
      // Clear the error message when there's no error
      setShowError(null);
    }
  }, [error, showError]);

  return (
    <div className="py-2 bg-[#f3f3f3] flex items-center justify-center">
      {/* conditionally renders the settings panel or the nodes selector panel */}
      {showError && (
        <div
          className="bg-[#FCCCCB] rounded-md 
            text-black font-bold py-2 px-4 
            fixed top-0"
        >
          {showError}
        </div>
      )}
      <div className="flex-grow"></div>
      <button
        className=" px-6 py-1 border-2 border-[#8890c0] 
          rounded-md text-[#444d8a] 
          font-semibold bg-white
          mr-6 md:mr-12 lg:mr-20"
        onClick={onSave}
      >
        Save Changes
      </button>
    </div>
  );
};

export default Header;
