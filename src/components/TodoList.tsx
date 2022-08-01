import TodoItem from './TodoItem'
import { useAppSelector } from '../hook'
import { Col, Row } from 'antd';

const TodoList: React.FC = () => {

   const notes = useAppSelector(state => state.notes.list)

   return (
      <Row gutter={[8, 8]}>
         {notes.map(n => <Col key={n.id} xs={12} sm={8}><TodoItem {...n} /></Col>)}
      </Row>
   )
}

export default TodoList