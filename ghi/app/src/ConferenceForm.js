import React from 'react'

class ConferenceForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            starts: '',
            ends: '',
            description: '',
            maxPresentations: '',
            maxAttendees: '',
            locations: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleMaxPresentationsChange = this.handleMaxPresentationsChange.bind(this);
        this.handleMaxAttendeesChange = this.handleMaxAttendeesChange.bind(this);

        //this.handleLocationChange = this.handleLocationChange.bind(this);
    }


    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.max_presentations = data.maxPresentations;
        data.max_attendees = data.maxAttendees;
        delete data.maxPresentations;
        delete data.maxAttendees;
        delete data.locations;
        console.log("DATA:", data);
      
        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference);
            const cleared = {
                name: '',
                starts: '',
                ends: '',
                description: '',
                maxPresentations: '',
                maxAttendees: '',
                location: '',
            };
            this.setState(cleared);
        }
    }

        handleLocationChange(event){
            const value = event.target.value;
            this.setState({location: value})
        }
        handleNameChange(event) {
            const value = event.target.value;
            this.setState({name: value})
        }
        handleStartDateChange(event) {
            const value = event.target.value;
            this.setState({starts: value})
        }
        handleEndDateChange(event) {
            const value = event.target.value;
            this.setState({ends: value})
        }
        handleDescriptionChange(event) {
            const value = event.target.value;
            this.setState({description: value})
        }
        handleMaxPresentationsChange(event) {
            const value = event.target.value;
            this.setState({maxPresentations: value})
        }
        handleMaxAttendeesChange(event) {
            const value = event.target.value;
            this.setState({maxAttendees: value})
        }

        async componentDidMount() {
            const url = "http://localhost:8000/api/locations/";

            const response = await fetch(url);
            
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                this.setState({locations: data.locations});
                
            }
        }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                        <h1>Create a new conference</h1>
                        <form onSubmit={this.handleSubmit} id="create-conference-form">
                            <div className="form-floating mb-3">
                            <input onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" value={this.state.name}/>
                            <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                            <input onChange={this.handleStartDateChange} placeholder="Starts" required type="date" name="starts" id="starts" className="form-control" value={this.state.starts}/>
                            <label htmlFor="starts">Starts</label>
                            </div>
                            <div className="form-floating mb-3">
                            <input onChange={this.handleEndDateChange} placeholder="Ends" required type="date" name="ends" id="ends" className="form-control"value={this.state.ends}/>
                            <label htmlFor="ends">Ends</label>
                            </div>
                            <div className = "form-floating mb-3">
                            <p><label htmlFor="description">Description</label></p>
                            <textarea onChange={this.handleDescriptionChange} id="description" name="description" className="form-control" value={this.state.description}></textarea>
                            </div>
                            <div className="form-floating mb-3">
                            <input onChange={this.handleMaxPresentationsChange} placeholder="Max Presentations" required type="number" name="max_presentations" id="max_presentations" className="form-control" value={this.state.maxPresentations}/>
                            <label htmlFor="max_presentations">Max Presentations</label>
                            </div>
                            <div className="form-floating mb-3">
                            <input onChange={this.handleMaxAttendeesChange} placeholder="Max Attendees" required type="number" name="max_attendees" id="max_attendees" className="form-control" value={this.state.maxAttendees}/>
                            <label htmlFor="max_attendees">Max Attendees</label>
                            </div>
                            <div className="mb-3">
                            <select onChange={this.handleLocationChange} required id="location" name="location" className="form-select" value={this.state.locations}>
                            <option value=''>Choose a location</option>    
                            {this.state.locations.map(location => {
                                return (
                                    <option key={location.id} value={location.id}>
                                        {location.name}
                                    </option>
                                );
                                })}
                            </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ConferenceForm;