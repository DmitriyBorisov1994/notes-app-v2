import NoteItem from './NoteItem'
import { useAppSelector } from '../hook'
import { Col, Row } from 'antd';

const NotesList: React.FC = () => {

   const notes = useAppSelector(state => state.notes.list)

   return (
      <Row gutter={[8, 8]}>
         {notes.map(n => <Col key={n.id} xs={12} sm={8}><NoteItem {...n} /></Col>)}
      </Row>
   )
}

export default NotesList