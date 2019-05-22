import React, { Component } from 'react';
import { connect } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { tasks } from "../actions";

class Tasks extends Component {

    componentDidMount() {
      this.props.fetchTasks();
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
          <div className='content'>
            <FullCalendar
              defaultView="timeGridWeek"
              themeSystem="bootstrap"
              locale={esLocale}
              header={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
              }}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin, bootstrapPlugin]}
              ref={this.calendarComponentRef}
              events={this.props.tasks}
              dateClick={this.handleDateClick}
              eventClick={this.toggleEventModal}
              nowIndicator={true}
            />
          </div>
      );
    }
}
const mapStateToProps = state => {
    return {
      tasks: state.tasks,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      fetchTasks: () => {
        dispatch(tasks.fetchTasks());
      },
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Tasks);