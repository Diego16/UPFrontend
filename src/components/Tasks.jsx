import React, { Component } from 'react';
import { connect } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import TaskModal from './TaskModal';
import { tasks } from "../actions";

class Tasks extends Component {

    componentDidMount() {
        this.props.fetchTasks();
    }

    calendarComponentRef = React.createRef()
    state = {
        updateTaskId: null,
        isModalOpen: false,
        taskModal: false,
        start: new Date()
    }

    render() {
        return (
            <div className='content'>
                <FullCalendar
                    defaultView="timeGridWeek"
                    themeSystem="bootstrap"
                    customButtons={{
                        addButton: {
                            text: 'Agregar Tarea',
                            click: this.toggleModal
                        }
                    }}
                    locale={esLocale}
                    header={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'addButton dayGridMonth,timeGridWeek,listWeek'
                    }}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin, bootstrapPlugin, listPlugin]}
                    ref={this.calendarComponentRef}
                    events={this.props.tasks}
                    dateClick={this.handleDateClick}
                    eventClick={(info) => { this.setState({ updateTaskId: info.event.id, isModalOpen: !this.state.isModalOpen }); console.log(this.state.updateTaskId) }}
                    nowIndicator={true}
                />
                <TaskModal
                    updateTaskId={this.state.updateTaskId}
                    show={this.state.isModalOpen}
                    onClose={this.toggleModal}
                    changeStart={this.toggleStart}
                    start={this.state.start}
                />
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