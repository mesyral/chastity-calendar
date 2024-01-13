import { Calendar as RBC, momentLocalizer } from "react-big-calendar";
import moment from "moment"
import 'moment/locale/zh-tw'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { zhtw } from './locale/zh-tw'
import { useCallback } from "react";
import './color.css'

const localizer = momentLocalizer(moment)

export default function Calendar(props) {
  const eventPropGetter = useCallback(
    (event) => {
      let classes = [event.type]
      
      if (event.type === 'lock')
        classes.push(event.locked ? 'locked' : 'unlocked')
      if (event.created_at.toDateString() !== event.start.toDateString())
        classes.push('retrospective')

      return {className: classes.join(' ')}
    },
    []
  )

  const titleAccessor = useCallback(
    (event) => {
      if (event.type === 'cum' && 'reason' in event && event.reason !== '')
        return `${event.title}：${event.reason}`;

      return event.title
    },
    []
  )

  return <RBC
    localizer={localizer}
    style={{height: '80vh'}}
    views={['month', 'week']}
    messages={zhtw}
    events={props.events}
    eventPropGetter={eventPropGetter}
    titleAccessor={titleAccessor}
    onDoubleClickEvent={(ev) => props.removeEvent(ev)}
    onKeyPressEvent={(ev, e) => e.code === 'KeyD' && props.removeEvent(ev) }
  />
}