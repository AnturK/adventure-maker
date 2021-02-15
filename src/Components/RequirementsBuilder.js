import {ReqGroupData,ReqData} from '../State'
import {InputGroup,Button,Card,ListGroup,FormControl,ButtonGroup} from 'react-bootstrap'
import { useState } from 'react'

export function RequirementsBuilder(props) {
    const handleRequirementsChanged = props.handleRequirementsChanged
    const handleRequirementAdded = props.handleRequirementAdded
    const handleRequirementDeleted = props.handleRequirementDeleted
  
    function add_req_group() {
      handleRequirementAdded(new ReqGroupData())
    }
  
    function add_req() {
      handleRequirementAdded(new ReqData())
    }
  
    if (!props.requirements) {
      return (
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>
            {props.title}
          </InputGroup.Text>
        </InputGroup.Prepend>
        <InputGroup.Append>
          <Button onClick={add_req}>Add Requirements</Button>
        </InputGroup.Append>
      </InputGroup>)
    }
    return (
      <>
      <Card.Header>{props.title}</Card.Header>
      <ListGroup>
        {props.requirements.map(req => {
          return req.requirements ? (
            <ReqGroup
              key={req.id} 
              group={req}
              handleReqGroupChanged={(prop_name,new_value) => handleRequirementsChanged(req, prop_name, new_value)}
              handleReqGroupDeleted={() => handleRequirementDeleted(req)}
              />) :
            (<SingleReq 
              key={req.id}
              requirement={req}
              handleReqChanged={(prop_name, new_value) => handleRequirementsChanged(req, prop_name, new_value)}
              handleReqDeleted={() => handleRequirementDeleted(req)}
            />)
        })}
        <ListGroup.Item>
          <ButtonGroup>
            <Button onClick={add_req_group}>Add Req Group</Button>
            <Button onClick={add_req}>Add Single Req</Button>
          </ButtonGroup>
        </ListGroup.Item>
      </ListGroup></>)
  }


  
  function SingleReq(props) {
    const handleReqDeleted = props.handleReqDeleted
    const handleReqChanged = props.handleReqChanged
    return (
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Quality</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl value={props.requirement.quality} onChange={e => handleReqChanged("quality", e.target.value)} />
        <FormControl as="select" value={props.requirement.operator} onChange={e => handleReqChanged("operator", e.target.value)}>
          <option>==</option>
          <option>!=</option>
          <option>&gt;</option>
          <option>&lt;</option>
          <option>&gt;=</option>
          <option>&lt;=</option>
        </FormControl>
        <FormControl value={props.requirement.value} onChange={e => handleReqChanged("value", e.target.value)}/>
        <InputGroup.Append>
          <Button variant="danger" onClick={() => handleReqDeleted(props.requirement)}>Delete</Button>
        </InputGroup.Append>
      </InputGroup>
    )
  }
  
  function ReqGroup(props) {
    const handleReqGroupDeleted = props.handleReqGroupDeleted
    const handleReqGroupChanged = props.handleReqGroupChanged

    const addSubGroup = () => {
      const new_group = new ReqGroupData()
      const new_reqs = [...props.group.requirements, new_group]
      handleReqGroupChanged("requirements",new_reqs)
    }
  
    const addSubReq = () => {
      const new_req = new ReqData()
      const new_reqs = [...props.group.requirements, new_req]
      handleReqGroupChanged("requirements",new_reqs)
    }
  
    const deleteSubReq = (deleted) =>{
      const new_reqs = props.group.requirements.filter(x => x !== deleted)
      handleReqGroupChanged("requirements",new_reqs)
    }
  
    const updateSubReq = (old_req,prop,new_value) =>{
      const changed_req = {...old_req, [prop]:new_value}
      const new_reqs = props.group.requirements.slice()
      new_reqs[props.group.requirements.indexOf(old_req)] = changed_req
      handleReqGroupChanged("requirements",new_reqs)
    }
  
    return (
      <Card border="dark">
        <Card.Header>
          <InputGroup>
            <FormControl as="select" value={props.group.group_type} onChange={e => handleReqGroupChanged("group_type",e.target.value)}> 
              <option>AND</option>
              <option>OR</option>
            </FormControl>
            <InputGroup.Text>Group</InputGroup.Text>
            <InputGroup.Append>
              <Button variant="danger" onClick={() => handleReqGroupDeleted(props.group)} >Delete</Button>
            </InputGroup.Append>
          </InputGroup>
        </Card.Header>
        <ListGroup>
          <ListGroup.Item>
            {props.group.requirements.map(req =>{
              return req.requirements ? 
                (<ReqGroup
                  key={req.id}
                  group={req}
                  handleReqGroupDeleted={deleteSubReq}
                  handleReqGroupChanged={(prop,new_value) => updateSubReq(req,prop,new_value)}
                />) : 
                (<SingleReq
                  key={req.id} 
                  requirement={req}
                  handleReqDeleted={deleteSubReq}
                  handleReqChanged={(prop,new_value) => updateSubReq(req,prop,new_value)}
                />)
            })}
          </ListGroup.Item>
          <ListGroup.Item>
            <ButtonGroup>
              <Button onClick={addSubGroup}>Add Req Group</Button>
              <Button onClick={addSubReq}>Add Single Req</Button>
            </ButtonGroup>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    )
  }