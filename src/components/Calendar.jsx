import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from "react-router-dom";
import FullCalendar from '@fullcalendar/react';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import Modal from './Modal';
//import Navbar from './Navbar';
import { events, auth } from "../actions";


class Calendar extends Component {

  componentDidMount() {
    this.props.fetchEvents();
  }

  calendarComponentRef = React.createRef()
  state = {
    updateEventId: null,
    isModalOpen: false,
    start: new Date()
  }

  render() {
    // if (!this.props.isAuthenticated) {
    //   return <Redirect to="/login" />
    // }
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
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin, bootstrapPlugin]}
            ref={this.calendarComponentRef}
            events={this.props.events}
            dateClick={this.handleDateClick}
          />
          <Modal show={this.state.isModalOpen}
            onClose={this.toggleModal} start={this.state.start}>
          </Modal>
        </div>
      </div>
    );
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  toggleStart = (date) => {
    this.setState({
      start: date
    })
  }

  handleDateClick = (arg) => {
    this.toggleStart(arg.date)
    this.toggleModal()
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
    fetchEvents: () => {
      dispatch(events.fetchEvents());
    },
    logout: () => dispatch(auth.logout()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
