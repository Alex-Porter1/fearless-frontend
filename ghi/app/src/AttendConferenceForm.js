import React from 'react'

class AttendConferenceForm extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            name: '',
            email: '',
            conferences: [],
            success: false
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleConferenceChange = this.handleConferenceChange.bind(this);

    }

    handleConferenceChange(event) {
        const value = event.target.value;
        this.setState({conference: value})
        console.log(value);
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value})
    }
    handleEmailChange(event) {
        const value = event.target.value;
        this.setState({email: value})
    }

    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state};
        console.log(data);
        delete data.conferences;
        delete data.success;

        console.log(data);

        const attendeeUrl = `http://localhost:8001${data.conference}attendees/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(attendeeUrl, fetchConfig);
        if (response.ok) {
            const newAttendee = await response.json();
            console.log(newAttendee);
            const cleared = {
                name: '',
                email: '',
                conference: '',
            };
            this.setState(cleared);
            this.setState({success: true})
        }

    }

    async componentDidMount() {
        const url = "http://localhost:8000/api/conferences/";

        const response = await fetch(url);
        
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            this.setState({conferences: data.conferences});
            
        }
    }
    render() {
        let spinnerClasses = 'd-flex justify-content-center mb-3';
        let dropdownClasses = 'form-select d-none';
        if (this.state.conferences.length > 0) {
            spinnerClasses = 'd-flex justify-content-center mb-3 d-none';
            dropdownClasses = 'form-select';
        }
        let formClasses = ""
        let successClasses = "alert alert-success d-none mb-0"
        if (this.state.success === true) {
            successClasses = "alert alert-success mb-0"
            formClasses = "d-none"
        }

        return(
            <React.Fragment>
            <div className="my-5">
                <div className="row">
                    <div className="col col-sm-auto">
                    <img width="300" className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg"/>
                    </div>
                    <div className="col">
                    <div className="card shadow">
                        <div className="card-body">
                        <form onSubmit={this.handleSubmit} id="create-attendee-form" className={formClasses}>
                            <h1 className="card-title">It's Conference Time!</h1>
                            <p className="mb-3">
                            Please choose which conference
                            you'd like to attend.
                            </p>
                            <div className={spinnerClasses} id="loading-conference-spinner">
                            <div className="spinner-grow text-secondary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            </div>
                            <div className="mb-3">
                            <select onChange={this.handleConferenceChange} name="conference" id="conference" className={dropdownClasses} value={this.state.conference}>
                            <option value=''>Choose a conference</option>
                            {this.state.conferences.map(conference => {
                                return (
                                    <option key={conference.href} value={conference.href}>
                                        {conference.name}
                                    </option>
                                );
                                })}
                            </select>
                            </div>
                            <p className="mb-3">
                            Now, tell us about yourself.
                            </p>
                            <div className="row">
                            <div className="col">
                                <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} required placeholder="Your full name" type="text" id="name" name="name" className="form-control" value={this.state.name}/>
                                <label htmlFor="name">Your full name</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-floating mb-3">
                                <input onChange={this.handleEmailChange} required placeholder="Your email address" type="email" id="email" name="email" className="form-control" value={this.state.email}/>
                                <label htmlFor="email">Your email address</label>
                                </div>
                            </div>
                            </div>
                            <button className="btn btn-lg btn-primary">I'm going!</button>
                        </form>
                        <div className={successClasses} id="success-message">
                            Congratulations! You're all signed up!
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </React.Fragment>
        )
    }
}

export default AttendConferenceForm;