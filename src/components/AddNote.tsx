import { Input } from 'antd';
const { TextArea } = Input;

interface AddTodoProps {
   text: string,
   onSetText: (str: string) => void,
}

const AddNote: React.FC<AddTodoProps> = ({ text, onSetText }) => {

   return (
      <div>
         <TextArea
            size='large'
            placeholder='...'
            value={text}
            onChange={(e) => onSetText(e.target.value)}
            allowClear={true}
         />
      </div>
   )
}

export default AddNote