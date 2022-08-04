import NoteItem from './NoteItem'
import { Col, Row } from 'antd';
import { Note } from '../store/notesSlice';

type NoteListProps = {
   notes: Note[],
}

const NotesList: React.FC<NoteListProps> = ({ notes }) => {

   return (
      <Row gutter={[8, 8]}>
         {notes.map(n => <Col key={n.id} xs={12} sm={8}><NoteItem {...n} /></Col>)}
      </Row>
   )
}

export default NotesList