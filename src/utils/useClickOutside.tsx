import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

//  hook to add event handler to nodes that on clicking outside scope of hook calls a dispatch function

const useClickOutside = (classname: string, callback: CallableFunction) => {
  const settingsActive = useSelector(
    (state: RootState) => state.settings.settingActive
  );
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !(event.target as HTMLElement).closest(classname) &&
        settingsActive !== true
      ) {
        callback();
      }
    };
    // Attach the click event listener to the document body
    document.body.addEventListener("click", handleClickOutside);
    //console.log('inside')
    // Cleanup the event listener on component unmount
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [callback, classname, settingsActive]);
};

export default useClickOutside;
