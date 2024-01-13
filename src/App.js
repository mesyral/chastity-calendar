import { useEffect, useState } from 'react';
import './App.css';

import Calendar from './Calendar';
import Navigator from './Navigator';
import useLocalStorage from 'use-local-storage';


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


  useEffect(() => {
    setData(JSON.stringify(events))
  }, [events, setData]);

  const removeEvent = (e) => {
    setEvents(events.filter(ev => e.id !== ev.id))
  }

  const createEvent = (date, title, type, meta) => {
    if (date.toDateString() === new Date(null).toDateString()) return;
    if (date > new Date()) return;
    const id = events.length ? Math.max(...events.map(e => e.id)) + 1 : 1;

    setEvents([
      ...events,
      {
        id,
        start: date,
        end: date,
        created_at: new Date(),
        title: title,
        type: type,
        ...meta,
      },
    ])
  }

  return (
    <div className="App">
      <Navigator 
        createEvent={createEvent}
      />
      <Calendar 
        events={events}
        removeEvent={removeEvent}
      />
    </div>
  );
}

export default App;
