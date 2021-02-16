import React,{useEffect, useRef, useState} from 'react'
import { Button, Col, Container, Row, Tab, Nav, FormControl, FormGroup, Form, Card, ListGroup, } from 'react-bootstrap'
import {useRecoilState} from 'recoil'
import {AdventureState,NodesSelector,NodeData,TriggersSelector,TriggerData, unique_id} from './../State'
import {updateProp} from './../Helpers'
import {AdventureNode} from './AdventureNode'
import {AdventureTrigger} from './AdventureTrigger'

export function AdventureEditor() {
    const [adventure,setAdventure] = useRecoilState(AdventureState);
    const [nodes] = useRecoilState(NodesSelector)
    const [triggers] = useRecoilState(TriggersSelector)

    const [activeTab,setActiveTab] = useState("")
   
    const add_node = () => {
      const modified_adventure = {...adventure,
        nodes:[...nodes,new NodeData()]
      }
      setAdventure(modified_adventure)
    }
    const delete_node = (node) => {
      const changed_nodes = nodes.filter(x => x !== node)
      setAdventure(updateProp(adventure,"nodes",changed_nodes))
    }

    useEffect(() => {
      if(nodes.length && !adventure.starting_node){
        setAdventure(updateProp(adventure,"starting_node",nodes[0].name))
      }
      if(nodes.length && (!activeTab || !nodes.find(x => x.id === activeTab))){
        setActiveTab(nodes[0].id)
      }
    },[nodes,activeTab,adventure,setAdventure])

    const add_trigger = () => {
      const modified_adventure = {...adventure,
        triggers:[...triggers,new TriggerData()]
      }
      setAdventure(modified_adventure)

    }
    const delete_trigger = (trigger) => {
      const changed_triggers = triggers.filter(x => x !== trigger)
      setAdventure(updateProp(adventure,"triggers",changed_triggers))
      
    }

    
    const handleExport = () => {
      const data_object = {
        adventure_name: adventure.name,
        starting_node: adventure.starting_node,
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
    }
  
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
  
        const modified_adventure = {...adventure,
          name:result.adventure_name,
          starting_node:result.starting_node,
          triggers:result.triggers,
          nodes:result.nodes
        }
        setAdventure(modified_adventure)
      }
      reader.readAsText(e.target.files[0])
    }

    const ImportInput = useRef()
    const clickImport = () => {
      ImportInput.current.click()
    }

    const [draggedItem,setDraggedItem] = useState(null)

    const start_dragging = (e,node) => {
      setDraggedItem(node)
    } 

    const end_dragging = (e,node) => {
      setDraggedItem(null)
    }

    const switch_node = (node) => {
      if(draggedItem != null){
        const index_a = nodes.indexOf(node)
        const index_b = nodes.indexOf(draggedItem)
        const modified_nodes = nodes.slice();
        [modified_nodes[index_a],modified_nodes[index_b]] = [modified_nodes[index_b],modified_nodes[index_a]]
        setAdventure(updateProp(adventure,"nodes",modified_nodes))
      }
    }

    const validate_drop = (e,node) => {
      if(draggedItem != null && node !== draggedItem){
        e.preventDefault()
      }
    }
  
    return (
    <Container fluid="xl">
      <Form>
        <FormGroup>
          <Form.Label>Adventure name</Form.Label>
          <FormControl placeholder="New adventure" value={adventure.name} onChange={(e) => setAdventure(updateProp(adventure,"name",e.target.value))} />
        </FormGroup>
        <FormGroup>
          <Form.Label>Starting node</Form.Label>
          <FormControl as="select" value={adventure.starting_node} onChange={(e) => setAdventure(updateProp(adventure,"starting_node",e.target.value))}>
            {nodes.map(node => (<option key={node.id}>{node.name}</option>))}
          </FormControl>
        </FormGroup>
      </Form>
      <Tab.Container id="nodes" activeKey={activeTab} onSelect={e => setActiveTab(e)}>
        <Row>
          <Col>
            <Nav variant="tabs">
              {nodes.map(node => (
                <Nav.Item 
                  key={node.id} 
                  draggable 
                  onDragEnd={e => end_dragging(e,node)} 
                  onDragStart={e => start_dragging(e,node)} 
                  onDrop={e => switch_node(node)}
                  onDragOver={e => validate_drop(e,node)}
                  >
                  <Nav.Link eventKey={node.id}>{node.name}</Nav.Link>
                </Nav.Item>))}
              <Nav.Item>
                <Nav.Link onClick={add_node}>Add Node</Nav.Link>
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
                      handleNodeDeletion={() => delete_node(node)}
                      />
                  </Tab.Pane>))}
              </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <Row>
        <Container class="border border-primary">
          <Col>
          <Row>
            Triggers
          </Row>
          <Row>
            <ListGroup>
              {triggers.map(trigger => (
                <AdventureTrigger trigger={trigger} handleDeletion={() => delete_trigger(trigger)}/>
              ))}
            <ListGroup.Item>
              <Button onClick={add_trigger}>Add Trigger</Button>
            </ListGroup.Item>
            </ListGroup>
          </Row>
          </Col>
        </Container>
      </Row>
      <Row>
        <Col>
          <Button onClick={handleExport}>Export</Button>
          <Button onClick={clickImport}>Import</Button>
          <Form.File
            onChange={handleImport}
            accept=".json"
            ref={ImportInput}
            style ={{display:"none"}}/>
        </Col>
      </Row>
    </Container>)
  }