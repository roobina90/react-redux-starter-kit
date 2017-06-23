import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Col, PageHeader } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as serviceActions from '../../actions/serviceActions'
import { bindActionCreators } from 'redux'
import NewService from '../newService' 
import { Link, browserHistory  } from 'react-router'

class ServicesContainer extends Component { 
  constructor(props){
    super()
    this.state = {
      input: '',
      connected: false,
      services: []
    }

    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleNewService = this.handleNewService.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this._handleServiceEvent = this._handleServiceEvent.bind(this)
     this._init = this._init.bind(this)
  }

  componentWillMount(){
    this._init()
  } 

  componentDidMount() {
    console.log("component services container did mount")
    this._handleServiceEvent();
  }

  handleOnChange(ev) {
    this.setState({input: ev.target.value})
  }

 handleNewService(ev) {
    ev.preventDefault()
    debugger;
    socket.emit('new service', {name: this.state.input, price: 99, isChosen: false})
    this.setState({input: ''})
  }

 _handleServiceEvent(){
    //ev.preventDefault()
    socket.on('new service', (incomingService) => {
      //this.props.newService(this.state.input)
      //todo: przyjrzec sie co robi createService
       this.props.createService(JSON.parse(incomingService)) 
       console.log('received service', incomingService)
     })
  }


  _init() {
    if(!(this.state.connected)){ 
      console.log("i am before fetch services")
      //todo: przyjrzec się fetchServices
      this.props.fetchServicesList().then((response) => {
       this.setState({services: response})
      })
     // socket.emit('subscribe', {room: this.props.params.room})
        this.setState({connected: true})
    }
}

  handleOnClick(room){
    //socket.emit("unsubscribe") 
    //socket.emit("subscribe", { room: room.title})
    //this.props.joinRoom(room)   
    //browserHistory.push(`/abc/${room.title}`)
  }  

 

  // fetchServices(){
  //   if (!this.state.connected) { 
  //     this.props.fetchServicesList()
  //     this.state.connected = true
  //   }
  // }

  handleChooseUsluga(usluga) {
    socket.emit()
  }

  render() {
    const services = this.props.services.map((service, i) => { 
      debugger;
      return ( 
        <ListGroupItem key={i} >
        {service.name} -- {service.price} $$
        </ListGroupItem> 
      )
    })

    return (
      <div>
        <Col xs={10} xsOffset={1}> 
          <ListGroup>
            {services}
            <NewService handleOnChange={this.handleOnChange} handleNewService={this.handleNewService} value={this.state.input}/>
          </ListGroup>
        </Col>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
 return { services: state.services }
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({ toggleService: serviceActions.fetchServiceData, createService: serviceActions.saveService, newService: serviceActions.newService, fetchServicesList: serviceActions.fetchServicesList}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicesContainer)