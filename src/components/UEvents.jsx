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

  calendarComponentRef = React.createRef()
  state = {
    updateEventId: null,
    isModalOpen: false,
    eventModal: false,
    start: new Date()
  }

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
            eventClick={this.toggleEventModal}
            nowIndicator={true}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
    return {
      events: state.events,
      user: state.auth.user,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      fetchUEvents: () => {
        dispatch(events.fetchUEvents());
      },
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(UEvents);