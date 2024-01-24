import { useState } from 'react';
import SegmentFrom from './components/SegmentForm';
import './style.css';


function App() {

  const [open, setOpen] = useState(false);

  const segmentOpen = () => {
    setOpen(true)
  }

  const segmentClose = () => {
    setOpen(false)
  }

  return (
    <div className='Container'>
      <div className='Container-center'>
        <button type='button' onClick={segmentOpen}>Save Segment</button>
      </div>
      <SegmentFrom isOpen={open} onClose={segmentClose} />

    </div>
  );
}

export default App;
