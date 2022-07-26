import React from "react"

class PresentationForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            presenterName: '',
            presenterEmail: '',
            companyName: '',
            title: '',
            synopsis: '',
            conferences:[]
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
        this.handleConferenceChange = this.handleConferenceChange.bind(this);
        this.handlePresenterEmailChange = this.handlePresenterEmailChange.bind(this);
        this.handlePresenterNameChange = this.handlePresenterNameChange.bind(this);
        this.handleSynopsisChange = this.handleSynopsisChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConferenceChange = this.handleConferenceChange.bind(this);
    }

    handlePresenterNameChange(event) {
        const value = event.target.value;
        this.setState({presenterName: value})
    }
    handlePresenterEmailChange(event) {
        const value = event.target.value;
        this.setState({presenterEmail: value})
    }

    handleCompanyNameChange(event) {
        const value = event.target.value;
        this.setState({companyName: value})
    }

    handleTitleChange(event) {
        const value = event.target.value;
        this.setState({title: value})
    }

    handleSynopsisChange(event) {
        const value = event.target.value;
        this.setState({synopsis: value})
    }

    handleConferenceChange(event) {
        const value = event.target.value;
        this.setState({conference: value})
        console.log(value);
    }


    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state};

        data.presenter_name = data.presenterName;
        console.log("DATA:", data.presenter_name)
        data.presenter_email = data.presenterEmail;
        data.company_name = data.companyName;
        console.log(data);
        delete data.presenterName;
        delete data.presenterEmail;
        delete data.companyName;
        delete data.conferences;

        console.log(data);
        console.log("DATA CONFERENCE:", data.conference)
        const presentationUrl = `http://localhost:8000${data.conference}presentations/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(presentationUrl, fetchConfig);
        if (response.ok) {
            const newPresentation = await response.json();
            console.log(newPresentation);
            const cleared = {
                presenterName: '',
                presenterEmail: '',
                companyName: '',
                title: '',
                synopsis: '',
                conference: '',
            };
            this.setState(cleared);
        
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
    return (
        <div>
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new presentation</h1>
            <form onSubmit={this.handleSubmit} id="create-presentation-form">
              <div className="form-floating mb-3">
                <input onChange={this.handlePresenterNameChange} placeholder="Presenter Name" required type="text" name="presenter_name" id="presenter_name" className="form-control" value={this.state.presenterName}/>
                <label htmlFor="presenter_name">Presenter Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handlePresenterEmailChange} placeholder="Presenter Email" required type="email" name="presenter_email" id="presenter_email" className="form-control" value={this.state.presenterEmail}/>
                <label htmlFor="presenter_email">Presenter Email</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleCompanyNameChange} placeholder="Company Name" type="text" name="company_name" id="company_name" className="form-control" value={this.state.companyName}/>
                <label htmlFor="company_name">Company Name</label>
              </div>
              <div className="form-floating mb-3">
                  <input onChange={this.handleTitleChange} placeholder="Title" required type="text" name="title" id="title" className="form-control" value={this.state.title}/>
                  <label htmlFor="title">Title</label>
                </div>
              <div className = "form-floating mb-3">
                <p><label htmlFor="synopsis">Synopsis</label></p>
                <textarea onChange={this.handleSynopsisChange} id="synopsis" name="synopsis" className="form-control" value={this.state.description}></textarea>
              </div>
              <div className="mb-3">
              <select onChange={this.handleConferenceChange} name="conference" id="conference" className="form-select" value={this.state.conference}>
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
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default PresentationForm;