import React, { Component } from 'react';
import { connect } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { events } from "../actions";


class UEvents extends Component {

  componentDidMount() {
    this.props.fetchUEvents();
  }
  onSubmit = () => {
    this.props.addEvent(this.state.title, this.state.start, this.state.endDate, this.state.isAllDayChecked, this.state.rrule, this.state.description, this.props.user.id, this.state.color);
  }
  state = {
    start: new Date(),
    isAllDayChecked: false,
    isRecurrent: false,
    end: new Date(),
    rrule: null,
    color: "#7B7B7B",
    title: "",
    description: "",
  }
  calendarComponentRef = React.createRef()
  render() {
    return (
      <div className='app'>
        <div className='content'>
          <FullCalendar
            defaultView="timeGridWeek"
            themeSystem="bootstrap"
            locale={esLocale}
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'timeGridWeek,timeGridDay,listWeek'
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin, bootstrapPlugin]}
            ref={this.calendarComponentRef}
            events={this.props.events}
            eventClick={(info) => { this.loadEvent(info); if (window.confirm("¿Desea agregar el evento " +info.event.title+ " a su calendario?"))this.onSubmit();}}
            nowIndicator={true}
          />
        </div>
      </div>
    );
  }
  loadEvent = (info) => {
    this.setState({
      start: info.event.start,
      end: info.event.end,
      title: info.event.title,
      color: info.event.color,
      description: info.event.description,
      isAllDayChecked: info.event.allDay,
      isRecurrent: info.event.recurrent,
      rrule: info.event.rrule,
    })
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    events: state.events,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUEvents: () => dispatch(events.fetchUEvents()),
    addEvent: (title, startDate, endDate, allDay, rrule, description, user, color) => dispatch(events.addEvent(title, startDate, endDate, allDay, rrule, description, user, color)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UEvents);