import { FiArrowLeft } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { AppDispatch } from "../../store";
import { updateTextBox } from "../../features/nodeSlice";
//import { RootState } from "../../store";

const SettingsPanel: React.FC = () =>{

    const input = useSelector(state=>state.message)
    const [inputValue, setInputValue] = useState(input);
    const dispatch: AppDispatch = useDispatch()
    // Update inputValue whenever input changes
    useEffect(() => {
        setInputValue(input);
    }, [input]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setInputValue(input)
        dispatch(updateTextBox(input))
    }

    //console.log(input)
    return(
        <div className="w-full h-full">
            <div className="flex items-center justify-center px-2">
                <p className="text-sm"><FiArrowLeft /></p>
                <p className="mx-auto  text-sm">Message</p>
            </div>

            <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-[#E3E3E3]"></div>
            </div>

            <form>
                <p className="text-[#a3a3a3] text-sm">Text</p>
                <textarea value={inputValue} onChange={handleChange} className="outline outline-[#E3E3E3] w-full rounded-md p-2 mt-2" />
            </form>

            <div className="relative flex py-2 items-center mt-2">
                <div className="flex-grow border-t border-[#E3E3E3]"></div>
            </div>
        </div>
    )
}

export default SettingsPanel