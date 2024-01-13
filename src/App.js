import { useEffect, useState } from 'react';
import './App.css';

import Calendar from './Calendar';
import Navigator from './Navigator';
import useLocalStorage from 'use-local-storage';

// const evs = [
//   {
//     id: 1,
//     start: new Date(2024, 0, 1),
//     end: new Date(2024, 0, 1),
//     created_at: new Date(),
//     title: '🔒 已鎖',
//     type: 'lock',
//     locked: true,
//   },
//   {
//     id: 2,
//     start: new Date(2024, 0, 2),
//     end: new Date(2024, 0, 2),
//     created_at: new Date(),
//     title: '🔓 沒鎖',
//     type: 'lock',
//     locked: false,
//   },
//   {
//     id: 3,
//     start: new Date(2024, 0, 3),
//     end: new Date(2024, 0, 3),
//     created_at: new Date(),
//     title: '💦 射精',
//     type: 'cum',
//     reason: '自慰',
//   },
//   {
//     id: 4,
//     start: new Date(),
//     end: new Date(),
//     created_at: new Date(),
//     title: '🔒 已鎖',
//     type: 'lock',
//     locked: true,
//   },
//   {
//     id: 5,
//     start: new Date(),
//     end: new Date(),
//     created_at: new Date(),
//     title: '🔓 沒鎖',
//     type: 'lock',
//     locked: false,
//   },
//   {
//     id: 6,
//     start: new Date(),
//     end: new Date(),
//     created_at: new Date(),
//     title: '💦 射精',
//     type: 'cum',
//     reason: '夢遺',
//   }
// ]

const dateReviver = (k, v) => {
  switch (k) {
    case 'start':
    case 'end':
    case 'created_at':
      return new Date(v);
    default:
      return v;
  }
} 

function App() {
  const [data, setData] = useLocalStorage('events', '[]')
  const [events, setEvents] = useState(JSON.parse(data, dateReviver))


  // useEffect(() => {
  //   setData(JSON.stringify(events))
  // }, [events]);

  const removeEvent = (e) => {
    setEvents(events.filter(ev => e.id !== ev.id))
  }

  return (
    <div className="App">
      <Navigator />
      <Calendar 
        events={events}
        removeEvent={removeEvent}
      />
    </div>
  );
}

export default App;
