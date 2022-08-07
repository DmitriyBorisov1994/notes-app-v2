import React, { useState } from 'react';
import { Segmented, Row, Col } from 'antd';
import { SegmentedValue } from 'antd/lib/segmented';
import { useDispatch } from 'react-redux';
import { changeFilter } from '../store/filterSlice';

const Filter: React.FC = () => {

   const [filter, setFilter] = useState<SegmentedValue>('all')
   const dispatch = useDispatch();

   return (
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
         <Col xs={2}>
            <Segmented
               style={{ backgroundColor: '#CFD8DC' }}
               options={[
                  {
                     label: 'Все',
                     value: 'all',
                  },
                  {
                     label: 'Важные',
                     value: 'important',
                  },
               ]}
               value={filter}
               onChange={(value: SegmentedValue) => {
                  setFilter(value)
                  dispatch(changeFilter(value))
               }
               }
            />
         </Col>
      </Row>


   );
};

export default Filter;