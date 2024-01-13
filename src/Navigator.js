import { useState } from 'react';
import './Navigator.css';
import './color.css';

export default function Navigator(props) {
  const [reason, setReason] = useState('')
  const [date, setDate] = useState(new Date(null))

  const createLockEvent = (date, locked) => {
    const title = locked ? '🔒 已鎖' : '🔓 沒鎖';
    props.createEvent(date, title, 'lock', { locked });
  }

  const createCumEvent = (reason) => {
    props.createEvent(new Date(), '💦 射精', 'cum', { reason });
  }

  return (
    <nav style={{ height: '20vh' }}>
      <form>
        <button type="button" className="locked" onClick={() => createLockEvent(new Date(), true)}>🔒 今天鎖著</button>
        <button type="button" className="unlocked" onClick={() => createLockEvent(new Date(), false)}>🔓 今天沒鎖</button>
      </form>
      <form>
        <input type="text" placeholder="夢遺、打手槍" onChange={e => setReason(e.target.value)}/>
        <button type="button" className="cummed" onClick={() => createCumEvent(reason)}>💦 今天有射</button>
      </form>
      <form>
        <input type="date" onChange={(e) => setDate(new Date(e.target.value))}/>
        <button type="button" className="locked" onClick={() => createLockEvent(date, true)}>🔒 那天鎖著</button>
        <button type="button" className="unlocked" onClick={() => createLockEvent(date, false)}>🔓 那天沒鎖</button>
      </form>
    </nav>
  )
}