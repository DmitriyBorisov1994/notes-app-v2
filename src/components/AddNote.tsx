import { PlusCircleOutlined, ClearOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';

interface AddTodoProps {
   text: string,
   onSetText: (str: string) => void,
   onAddNote: () => void,
}

const AddNote: React.FC<AddTodoProps> = ({ onAddNote, text, onSetText }) => {

   return (
      <div>
         <Input
            size='large'
            placeholder='Add Note'
            value={text}
            onChange={(e) => onSetText(e.target.value)}
            suffix={
               <>
                  <Tooltip title="Очистить">
                     <ClearOutlined
                        style={{ color: '#FFC107', marginRight: '.5rem' }}
                        onClick={() => {
                           onSetText('')
                        }}
                     />
                  </Tooltip>
                  <Tooltip title="Добавить">
                     <PlusCircleOutlined
                        style={{ color: '#FFC107' }}
                        onClick={() => {
                           onAddNote()
                           onSetText('')
                        }}
                     />
                  </Tooltip>
               </>
            }
         />
      </div>
   )
}

export default AddNote