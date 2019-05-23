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
        start: new Date(),
        title: "",
        color: "#B71C1C",
        description: "",
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
                    eventClick={(info) => { this.loadTask(info) }}
                    nowIndicator={true}
                />
                <TaskModal
                    show={this.state.isModalOpen}
                    onClose={this.toggleModal}
                    changeStart={this.toggleStart}
                    changeColor={this.changeColor}
                    changeTitle={this.changeTitle}
                    changeDescription={this.changeDescription}
                    cleanForm={this.cleanForm}
                    updateTaskId={this.state.updateTaskId}
                    start={this.state.start}
                    title={this.state.title}
                    color={this.state.color}
                    description={this.state.description}
                />
            </div>
        );
    }
    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        })
    }
    changeColor = (color) => {
        this.setState({
            color: color
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
    toggleStart = (date) => {
        this.setState({
            start: date
        })
    }
    handleDateClick = (arg) => {
        this.toggleStart(arg.date)
        this.toggleModal()
    }
    loadTask = (info) => {
        this.setState({
            updateTaskId: info.event.id,
            start: info.event.start,
            title: info.event.title,
            color: info.event.color,
            description: info.event.description,
            isModalOpen: !this.state.isModalOpen
        })
    }
    cleanForm = () => {
        this.setState({
            updateTaskId: null,
            start: new Date(),
            title: "",
            color: "#B71C1C",
            description: "",
        })
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