import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useEffect, useState } from 'react';

type SearchNoteProps = {
   handleSearch: (text: string) => void
}

const SearchNote: React.FC<SearchNoteProps> = ({ handleSearch }) => {

   const [search, setSearch] = useState('')

   useEffect(() => {
      handleSearch(search)
      //es-lint-disable-next-line
   }, [search])

   return (
      <div>
         <Input
            size='large'
            placeholder='Найти заметку'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            suffix={<SearchOutlined style={{ color: '#757575' }} />}
            allowClear={true}
         />
      </div>
   )
}

export default SearchNote