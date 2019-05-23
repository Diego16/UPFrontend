import React, { Component } from 'react';
import { connect } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import EventModal from './EventModal';
import { events } from "../actions";


class Calendar extends Component {

  componentDidMount() {
    this.props.fetchEvents();
  }

  calendarComponentRef = React.createRef()
  state = {
    updateEventId: null,
    isModalOpen: false,
    start: new Date(),
    isAllDayChecked: false,
    isRecurrent: false,
    end: new Date(),
    rrule: null,
    color: "#7B7B7B",
    title: "",
    description: "",
  }

  render() {
    return (
      <div className='app'>
        <div className='content'>
          <FullCalendar
            defaultView="timeGridWeek"
            themeSystem="bootstrap"
            locale={esLocale}
            customButtons={{
              addButton: {
                text: 'Agregar Evento',
                click: this.toggleModal
              }
            }}
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'addButton dayGridMonth,timeGridWeek,timeGridDay'
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin, bootstrapPlugin]}
            ref={this.calendarComponentRef}
            events={this.props.events}
            dateClick={this.handleDateClick}
            eventClick={(info) => { this.loadEvent(info) }}
            nowIndicator={true}
          />
          <EventModal
            show={this.state.isModalOpen}
            onClose={this.toggleModal}
            updateEventId={this.state.updateEventId}
            changeStart={this.toggleStart}
            changeColor={this.changeColor}
            changeTitle={this.changeTitle}
            changeDescription={this.changeDescription}
            changeRRule={this.changeRRule}
            toggleAllDay={this.toggleAllDay}
            toggleRecurrence={this.toggleRecurrence}
            cleanForm={this.cleanForm}
            start={this.state.start}
            isAllDayChecked={this.state.isAllDayChecked}
            isRecurrent={this.state.isRecurrent}
            end={this.state.end}
            rrule={this.state.rrule}
            color={this.state.color}
            title={this.state.title}
            description={this.state.description}
          />
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
  changeColor = (color) => {
    this.setState({
      color: color
    })
  }
  changeRRule = (rrule) => {
    this.setState({
      rrule: rrule
    })
  }
  changeTitle = (title) => {
    this.setState({
      title: title
    })
  }
  changeDescription = (description) => {
    this.setState({
      description: description
    })
  }
  toggleAllDay = () => {
    this.setState({
      isAllDayChecked: !this.state.isAllDayChecked
    })
  }
  toggleRecurrence = () => {
    this.setState({
      isRecurrent: !this.state.isRecurrent
    })
  }
  loadEvent = (info) => {
    this.setState({
      updateEventId: info.event.id,
      start: info.event.start,
      end: info.event.end,
      title: info.event.title,
      color: info.event.color,
      description: info.event.description,
      isAllDayChecked: info.event.allDay,
      isRecurrent: info.event.recurrent,
      rrule: info.event.rrule,
      isModalOpen: !this.state.isModalOpen
    })
  }
  cleanForm = () => {
    this.setState({
      updateEventId: null,
      start: new Date(),
      isAllDayChecked: false,
      isRecurrent: false,
      end: new Date(),
      rrule: null,
      color: "#7B7B7B",
      title: "",
      description: "null",
    })
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
    fetchEvents: () => dispatch(events.fetchEvents())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
