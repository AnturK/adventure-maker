import './App.css';
import React, { useCallback, useState} from 'react';
import { Button, Col, Container, Row, Tab, Nav, Card, ListGroup, FormControl, FormGroup, Form, ListGroupItem, InputGroup,ButtonGroup } from 'react-bootstrap'
import default_image from './signal_lost.png'


/*
TODO:
Random value in effects support.
Picking images, maybe allow embbedding as b64 since they're small but i'm unusre if that doesn't open some nastiness
Basic validation of loops/invalid node ids and such.
Styling this to look good aaahhh
*/

/// Eugh
let ids = {};
function unique_id(category) {
  category in ids ? ids[category] += 1 : ids[category] = 0
  return ids[category]
}

//Data classes

class NodeData{
  constructor(){
    this.id = unique_id("node")
    this.name = "Node "+this.id
    this.description = "Node description goes here"
    this.choices = []
    this.image = "yes"
    this.on_enter_effects = undefined
    this.on_exit_effects = undefined
  }
}

class ChoiceData{
  constructor(){
    this.id = unique_id("choice")
    this.name = "New Choice"
    this.exit_node = "FAIL"
    this.on_selection_effects = undefined
    this.requirements = undefined
  }
}

class EffectData{
  constructor(){
    this.id = unique_id("effect")
    this.effect_type = "Add"
    this.quality = "Quality"
    this.value = 1
  }
}

class ReqGroupData{
  constructor(){
    this.id = unique_id("req")
    this.group_type = "AND"
    this.requirements = []
  }
}

class ReqData{
  constructor(){
    this.id = unique_id("req")
    this.quality = "Quality"
    this.operator = "=="
    this.value = 1
  }
}

// Components

function AdventureNode(props) {
  const handleNodeDeletion = props.handleNodeDeletion
  const handleNodeChange = props.handleNodeChange
  const addChoice = (new_choice) => {
    const new_choices = [...props.node.choices, new_choice]
    handleNodeChange("choices", new_choices)
  }
  const removeChoice = (removed) => {
    const new_choices = props.node.choices.filter(x => x !== removed)
    handleNodeChange("choices", new_choices)
  }
  const updateChoice = (old_choice, new_choice) => {
    const new_choices = props.node.choices.slice()
    new_choices[props.node.choices.indexOf(old_choice)] = new_choice
    handleNodeChange("choices", new_choices)
  }

  const addEffect = (effect_prop, new_effect) => {
    const old_effects = props.node[effect_prop]
    const new_effects = old_effects !== undefined ? [...old_effects, new_effect] : [new_effect]
    handleNodeChange(effect_prop, new_effects)
  }

  const updateEffects = (effect_prop, old_effect, changed_prop, new_value) => {
    const changed_effect = { ...old_effect, [changed_prop]: new_value }
    const new_effects = props.node[effect_prop].slice()
    new_effects[props.node[effect_prop].indexOf(old_effect)] = changed_effect
    handleNodeChange(effect_prop, new_effects)
  }

  const deleteEffect = (effect_prop, removed) => {
    const new_effects = props.node[effect_prop].filter(x => x !== removed)
    handleNodeChange(effect_prop, new_effects.length ? new_effects : undefined)
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <Card.Img variant="top" src={default_image} />
            <Card.Body>
              <Card.Title>{props.node.name} <Button variant="danger" onClick={handleNodeDeletion}>Delete</Button></Card.Title>
              <FormGroup>
                <Form.Label>Node ID</Form.Label>
                <FormControl value={props.node.name} onChange={(e) => handleNodeChange("name", e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Form.Label>Description</Form.Label>
                <FormControl as="textarea" rows={5} placeholder="Describe whatever here." value={props.node.description} onChange={(e) => handleNodeChange("description", e.target.value)} />
              </FormGroup>
              <EffectBuilder
                title="On Enter Effects"
                effects={props.node.on_enter_effects}
                handleEffectAdded={added => addEffect("on_enter_effects", added)}
                handleEffectsChanged={(old, prop, new_value) => updateEffects("on_enter_effects", old, prop, new_value)}
                handleEffectDeleted={deleted => deleteEffect("on_enter_effects", deleted)} />
              <EffectBuilder
                title="On Exit Effects"
                effects={props.node.on_exit_effects}
                handleEffectAdded={added => addEffect("on_exit_effects", added)}
                handleEffectsChanged={(old, prop, new_value) => updateEffects("on_exit_effects", old, prop, new_value)}
                handleEffectDeleted={deleted => deleteEffect("on_exit_effects", deleted)} />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Header>Choices</Card.Header>
              <ListGroup>
                {props.node.choices.map(choice => (
                  <ListGroup.Item key={choice.id}>
                    <AdventureChoice
                      choice={choice}
                      handleChoiceDeletion={() => removeChoice(choice)}
                      handleChoiceChange={(choice_property, new_value) => {
                        const new_choice = { ...choice, [choice_property]: new_value }
                        updateChoice(choice, new_choice)
                      }}
                      all_nodes={props.all_nodes}
                    />
                  </ListGroup.Item>))}
                <ListGroupItem><Button onClick={() => addChoice(new ChoiceData())}>Add Choice</Button></ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

function EffectBuilder(props) {
  const handleEffectsChanged = props.handleEffectsChanged
  const handleEffectAdded = props.handleEffectAdded
  const handleEffectDeleted = props.handleEffectDeleted
  function add_effect() {
    handleEffectAdded(new EffectData())
  }
  if (!props.effects)
    return (
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>
            {props.title}
          </InputGroup.Text>
        </InputGroup.Prepend>
        <InputGroup.Append>
          <Button onClick={add_effect}>Create Effect</Button>
        </InputGroup.Append>
      </InputGroup>
    )
  return (
  <>
  <Card.Header>{props.title}</Card.Header>
  <ListGroup>
    {props.effects.map(effect => (
      <ListGroupItem key={effect.id}>
        <InputGroup>
          <FormControl as="select" value={effect.effect_type} onChange={e => handleEffectsChanged(effect, "effect_type", e.target.value)}>
            <option>Add</option>
            <option>Remove</option>
            <option>Set</option>
          </FormControl>
          <InputGroup.Prepend>
            <InputGroup.Text>Quality</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl value={effect.quality} onChange={e => handleEffectsChanged(effect, "quality", e.target.value)} />
          <InputGroup.Prepend>
            <InputGroup.Text>Value</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl value={effect.value} onChange={e => handleEffectsChanged(effect, "value", e.target.value)} />
          <InputGroup.Append>
            <Button variant="danger" onClick={() => handleEffectDeleted(effect)}>Delete</Button>
          </InputGroup.Append>
        </InputGroup>
      </ListGroupItem>))}
    <ListGroupItem>
      <Button onClick={add_effect}>Add New Effect</Button>
    </ListGroupItem>
  </ListGroup>
  </>)
}


function RequirementsBuilder(props) {
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
      <ListGroupItem>
        <ButtonGroup>
          <Button onClick={add_req_group}>Add Req Group</Button>
          <Button onClick={add_req}>Add Single Req</Button>
        </ButtonGroup>
      </ListGroupItem>
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
    <Card>
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
        <ListGroupItem>
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
        </ListGroupItem>
        <ListGroupItem>
          <ButtonGroup>
            <Button onClick={addSubGroup}>Add Req Group</Button>
            <Button onClick={addSubReq}>Add Single Req</Button>
          </ButtonGroup>
        </ListGroupItem>
      </ListGroup>
    </Card>
  )
}


function AdventureChoice(props) {
  const handleChoiceDeletion = props.handleChoiceDeletion
  const handleChoiceChange = props.handleChoiceChange


  const addEffect = (effect_prop, new_effect) => {
    const old_effects = props.choice[effect_prop]
    const new_effects = old_effects !== undefined ? [...old_effects, new_effect] : [new_effect]
    handleChoiceChange(effect_prop, new_effects)
  }
  const updateEffects = (effect_prop, old_effect, changed_prop, new_value) => {
    const changed_effect = { ...old_effect, [changed_prop]: new_value }
    const new_effects = props.choice[effect_prop].slice()
    new_effects[props.choice[effect_prop].indexOf(old_effect)] = changed_effect
    handleChoiceChange(effect_prop, new_effects)
  }
  const deleteEffect = (effect_prop, removed) => {
    const new_effects = props.choice[effect_prop].filter(x => x !== removed)
    handleChoiceChange(effect_prop, new_effects.length ? new_effects : undefined)
  }


  const addRequirement = added => {
    const old_reqs = props.choice.requirements
    const new_reqs = old_reqs !== undefined ? [...old_reqs, added] : [added]
    handleChoiceChange("requirements", new_reqs)
  }

  const deleteRequirement = removed => {
    const new_reqs = props.choice.requirements.filter(x => x !== removed)
    handleChoiceChange("requirements", new_reqs.length ? new_reqs : undefined)
  }

  const updateRequirements = (old_req, changed_prop, new_value) => {
    const changed_req = { ...old_req, [changed_prop]: new_value }
    const new_reqs = props.choice.requirements.slice()
    new_reqs[props.choice.requirements.indexOf(old_req)] = changed_req
    handleChoiceChange("requirements", new_reqs)
  }

  return (
    <Card>
      <Card.Body>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Choice</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl value={props.choice.name} onChange={(e) => handleChoiceChange("name", e.target.value)} />
          <InputGroup.Append>
            <Button variant="danger" onClick={handleChoiceDeletion}>Delete</Button>
          </InputGroup.Append>
        </InputGroup>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Exit Node</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl as="select" value={props.exit_node} onChange={(e) => handleChoiceChange("exit_node", e.target.value)}>
            <option>FAIL</option>
            <option>WIN</option>
            {props.all_nodes.map(node => (<option key={node.id}>{node.name}</option>))}
          </FormControl>
        </InputGroup>
        <EffectBuilder
            title="Selection Effects"
            effects={props.choice.on_selection_effects}
            handleEffectAdded={added => addEffect("on_selection_effects", added)}
            handleEffectsChanged={(old, prop, new_value) => updateEffects("on_selection_effects", old, prop, new_value)}
            handleEffectDeleted={deleted => deleteEffect("on_selection_effects", deleted)}/>
        <RequirementsBuilder
          title="Requirements"
          requirements={props.choice.requirements}
          handleRequirementAdded={addRequirement}
          handleRequirementDeleted={deleteRequirement}
          handleRequirementsChanged={updateRequirements}
        />
      </Card.Body>
    </Card>)
}


function App() {
  const [adventure_name, setAdventureName] = useState("New Adventure");
  const [starting_node, setStartingNode] = useState("START");
  //todo
  //const [band_modifiers, setBandModifiers] = useState([]);
  //const [required_traits, setRequiredTraits] = useState([]);
  //const [loot_types, setLootTypes] = useState([]);

  const [nodes, setNodes] = useState([]);

  const addNode = (new_node) => setNodes(old => [...old, new_node])
  const removeNode = (removed_node) => setNodes(old => old.filter(x => x !== removed_node))
  const updateNode = (old_node, new_node) => {
    setNodes(old => {
      const old_copy = old.slice()
      old_copy[old.indexOf(old_node)] = new_node
      return old_copy
    })
  }


  const handleExport = useCallback(() => {
    const data_object = {
      adventure_name: adventure_name,
      starting_node: starting_node,
      nodes: nodes
    }
    //Internal stuff, byond doesn't care about this
    const remove_ids = (key, value) => {
      if (key === "id")
        return undefined
      return value;
    }
    const blob = new Blob([JSON.stringify(data_object, remove_ids)], { type: 'application/json' })
    const blob_url = URL.createObjectURL(blob)
    window.open(blob_url)
  }, [adventure_name, starting_node, nodes])

  const handleImport = e => {
    var reader = new FileReader()
    reader.onload = (e) =>{
      const generate_ids = (key,value) => {
        if(value === Object(value)) //Thanks StackOverflow
        {
          value.id = unique_id("import")
        }
        return value
      }
      const result = JSON.parse(e.target.result,generate_ids)
      setAdventureName(result.adventure_name)
      setStartingNode(result.starting_node)
      setNodes(result.nodes)
    }
    reader.readAsText(e.target.files[0])
  }

  return (
    <Container>
      <Form>
        <FormGroup>
          <Form.Label>Adventure name</Form.Label>
          <FormControl placeholder="New adventure" value={adventure_name} onChange={(e) => setAdventureName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Form.Label>Starting node</Form.Label>
          <FormControl as="select" value={starting_node} onChange={(e) => setStartingNode(e.target.value)}>
            {nodes.map(node => (<option key={node.id}>{node.name}</option>))}
          </FormControl>
        </FormGroup>
      </Form>
      <Tab.Container id="nodes">
        <Row>
          <Col>
            <Nav variant="tabs">
              {nodes.map(node => (<Nav.Item key={node.id}><Nav.Link eventKey={node.id}>{node.name}</Nav.Link></Nav.Item>))}
              <Nav.Item>
                <Nav.Link onClick={() => addNode(new NodeData())}>Add Node</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col>
            <Tab.Content>
                {nodes.map(node => (
                  <Tab.Pane eventKey={node.id} key={node.id}>
                    <AdventureNode 
                      node={node}
                      handleNodeDeletion={() => removeNode(node)}
                      handleNodeChange={(node_property, new_value) => {
                        const new_node = { ...node, [node_property]: new_value }
                        updateNode(node, new_node)
                      }}
                      all_nodes={nodes}
                    />
                  </Tab.Pane>))}
              </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <Row>
        <Col>
          <Button onClick={handleExport}>Export</Button>
          <Form.Group>
            <Form.File 
              label="Import"
              onChange={handleImport} 
              custom/>
          </Form.Group>

        </Col>
      </Row>
    </Container>

  )
}

export default App;
