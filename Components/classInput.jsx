import { Component } from 'react';
import './classInput.css';

//This is an The Odin Project assignment about Class-based Components, and we're asked to add some
// functionalities like edit, delete and save buttons, and also a field to keep track of how many
// tasks were added

class ClassInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            inputVal: '',
            
            editIndex: -1,
            editTask: '',
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState((state) => ({
            ...state,
            inputVal: e.target.value,
        }));
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState((state) => ({
            todos: state.todos.concat(state.inputVal),
            inputVal: '',
        }));
    }

    // Function to delete tasks
    removeTask = (indexRemoved) => {
        this.setState((prevState) => ({
            todos: prevState.todos.filter((_, index) => index !== indexRemoved)
        }));
    }
    
    // Function to edit tasks already added
    handleEditTask = (index) => {
        this.setState({
            editIndex: index,
            editTask: this.state.todos[index],
        });
    }

    handleEditInputChange = (e) => {
        this.setState({ editTask: e.target.value });
    }

    //Function to save the tasks edited
    handleSaveEdit = () => {
        if (this.state.editTask.trim() !== '') {
            this.setState((prevState) => {
                const updatedTasks = [...prevState.todos];
                updatedTasks[prevState.editIndex] = prevState.editTask;
                return {
                    todos: updatedTasks,
                    editIndex: -1,
                    editTask: '',
                };
            });
        } else {
            this.setState({
                editIndex: -1,
                editTask: '',
            });
        }
    }

    // Function to cancel tasks edition
    handleCancelEdit = () => {
        this.setState({
            editIndex: -1,
            editTask: '',
        });
    }

    render() {
        return (
            <section>
                <h1 className='titleH1'>Planner</h1>
                <h3>{this.props.name}</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className='inputVal'>
                        <input 
                            type="text"
                            name='task-entry'
                            value={this.state.inputVal}
                            onChange={this.handleInputChange}
                            placeholder='Enter a task'
                            size={40} 
                        />
                        <button 
                            type='submit'
                            disabled={!this.state.inputVal}
                        >
                            Add
                        </button>
                    </div>
                </form>
                <h4 className='subtitleH4'>Tasks</h4>
                <div className='container'>
                    <ul className='inputTask'>
                        {this.state.todos.map((todo, index) => (
                            <li key={index}>
                                {this.state.editIndex === index ? (
                                    <div className='controlBtn'>
                                        <input 
                                            type="text" 
                                            value={this.state.editTask}
                                            onChange={this.handleEditInputChange}
                                        />
                                        <div className='secondControl'>
                                            <button 
                                                onClick={this.handleSaveEdit}
                                                className='editBtn'
                                            >
                                                Save
                                            </button>
                                            <button 
                                                onClick={this.handleCancelEdit}
                                                className='delBtn'
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='controlBtn'>
                                        <div>
                                            <h4>
                                                {todo}
                                            </h4>
                                        </div>
                                        <div className='firstControl'>
                                            <button
                                                onClick={() => this.handleEditTask(index)}
                                                className='editBtn'
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => this.removeTask(index)}
                                                className='delBtn'
                                            >
                                                Delete
                                            </button>
                                        </div>                         
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='countTask'>
                    <p>Tasks: {this.state.todos.length}</p>
                </div>
            </section>
        );
    }
}

export default ClassInput;