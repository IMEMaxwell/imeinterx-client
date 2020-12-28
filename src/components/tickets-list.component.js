import React,{Component, component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Ticket=props=>(
    <tr>
        <td>{props.ticket.username}</td>
        <td>{props.ticket.companyname}</td>
        <td>{props.ticket.category}</td>
        <td>{props.ticket.status}</td>
        <td>{props.ticket.title}</td>
        <td>{props.ticket.description}</td>
        <td>{props.ticket.solution}</td>
        <td>
            <Link to={"/edit/"+props.ticket._id}>edit</Link> | <a href="#" onClick={()=>{props.deleteTicket(props.ticket._id)}}>delete</a>
        </td>
    </tr>
)

export default class TicketsList extends Component{
    constructor(props){
        super(props);

        this.deleteTicket=this.deleteTicket.bind(this);
    
        this.state={tickets:[]};
    };

    componentDidMount(){
        axios.get('https://imeinterx.herokuapp.com/tickets/')
            .then(response=>{
                this.setState({tickets:response.data})
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    deleteTicket(id){
        axios.delete('https://imeinterx.herokuapp.com/tickets/'+id)
            .then(res=>console.log(res.data));
        this.setState({
            tickets:this.state.tickets.filter(el=>el._id!==id)
        })
    }

    ticketsList(){
        return this.state.tickets.map(currentticket=>{
            return <Ticket ticket={currentticket} deleteTicket={this.deleteTicket} key={currentticket._id}/>;
        })
    }

    render(){
        return(
            <div>
            <h3>Logged Tickets</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Username</th>
                  <th>Company Name</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Solution</th>
                </tr>
              </thead>
              <tbody>
                { this.ticketsList() }
              </tbody>
            </table>
          </div>
        )
    }
}