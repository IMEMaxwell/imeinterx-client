import React,{Component, component} from 'react'
import axios from'axios';

export default class EditTicket extends Component{
constructor(props){
    super(props);

    this.onChangeUsername=this.onChangeUsername.bind(this);
    this.onChangeCompanyname=this.onChangeCompanyname.bind(this);
    this.onChangeCategory=this.onChangeCategory.bind(this);
    this.onChangeStatus=this.onChangeStatus.bind(this);
    this.onChangeTitle=this.onChangeTitle.bind(this);
    this.onChangeDescription=this.onChangeDescription.bind(this);
    this.onChangeSolution=this.onChangeSolution.bind(this);
    this.onSubmit=this.onSubmit.bind(this);

    this.state={
        username:'',
        companyname:'',
        category:'',
        status:'',
        title:'',
        description:'',
        solution:'',
        users:[]
    }
}

componentDidMount(){
    axios.get('https://imeinterx.herokuapp.com/tickets/'+this.props.match.params.id)
        .then(response=>{
            this.setState({
                username:response.data.username,
                companyname:response.data.companyname,
                category:response.data.category,
                status:response.data.status,
                title:response.data.title,
                description:response.data.description,
                solution:response.data.solution,
            })
        })
        .catch(function(error){
            console.log(error)
        })

    axios.get('https://imeinterx.herokuapp.com/users/')
    .then(response=>{
        if(response.data.length>0){
            this.setState({
                users:response.data.map(user=>user.username),
                
            })
        }
    })
}

onChangeUsername(e){
    this.setState({
        username:e.target.value
    });
}

onChangeCompanyname(e){
    this.setState({
        companyname:e.target.value
    });
}

onChangeCategory(e){
    this.setState({
        category:e.target.value
    });
}

onChangeStatus(e){
    this.setState({
        status:e.target.value
    });
}

onChangeTitle(e){
    this.setState({
        title:e.target.value
    });
}

onChangeDescription(e){
    this.setState({
        description:e.target.value
    });
}

onChangeSolution(e){
    this.setState({
        solution:e.target.value
    });
}

onSubmit(e){
    e.preventDefault();

    const ticket ={
        username:this.state.username,
        companyname:this.state.companyname,
        category:this.state.category,
        status:this.state.status,
        title:this.state.title,
        description:this.state.description,
        solution:this.state.solution
    }

    console.log(ticket)

    axios.post('https://imeinterx.herokuapp.com/tickets/update/'+this.props.match.params.id, ticket)
        .then(res=>console.log(res.data));


    window.location='/';
}

    render(){
        return(
            <div>
            <h3>Edit Ticket Log</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}>
                    {
                      this.state.users.map(function(user) {
                        return <option 
                          key={user}
                          value={user}>{user}
                          </option>;
                      })
                    }
                </select>
              </div>
              <div className="form-group"> 
                <label>Company Name: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.companyname}
                    onChange={this.onChangeCompanyname}
                    />
              </div>
              <div className="form-group">
                <label>Category: </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.category}
                    onChange={this.onChangeCategory}
                    />
              </div>
              <div className="form-group">
                <label>Status: </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.status}
                    onChange={this.onChangeStatus}
                  />
              </div>
              <div className="form-group">
                <label>Title: </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                  />
              </div>
              <div className="form-group">
                <label>Description: </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                  />
              </div>
              <div className="form-group">
                <label>Solution: </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.solution}
                    onChange={this.onChangeSolution}
                  />
              </div>
      
              <div className="form-group">
                <input type="submit" value="Edit Ticket Log" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }
}