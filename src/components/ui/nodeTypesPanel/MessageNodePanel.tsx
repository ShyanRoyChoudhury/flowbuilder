import { BiMessageRoundedDetail } from "react-icons/bi";

function MessageNodePanel() {
  return (
    <div className="flex flex-col p-2 items-center justify-centern ">
        <p><BiMessageRoundedDetail size={40}/></p>
        <p>Message</p>
        
    </div>
  )
}

export default MessageNodePanel