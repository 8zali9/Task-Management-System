import { BsDot } from "react-icons/bs";

const ToastMsg = ({ msg, color }) => {
  return(
    <div className='toast-msg'>
      {msg}
      <BsDot color={color} fontSize='Larger'/>
    </div>
  )
}

export default ToastMsg