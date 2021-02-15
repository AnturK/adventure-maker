import React,{useRef, useState} from 'react'
import { Button, Col, Container, Row, Tab, Nav, FormControl, FormGroup, Form, } from 'react-bootstrap'
import {useRecoilState} from 'recoil'
import {AdventureState,NodesSelector,NodeData, unique_id} from './../State'
import {updateProp} from './../Helpers'
import {AdventureNode} from './AdventureNode'

export function AdventureEditor() {
    const [adventure,setAdventure] = useRecoilState(AdventureState);
    const [nodes] = useRecoilState(NodesSelector)

    const [activeTab,setActiveTab] = useState("")
   
    const add_node = () => {
      const modified_adventure = {...adventure,
        nodes:[...nodes,new NodeData()]
      }
      const new_node = modified_adventure.nodes[0]
      if(!modified_adventure.starting_node)
      {
        modified_adventure.starting_node = new_node.name
        setAdventure(modified_adventure)
        setActiveTab(new_node.id)
      }
      else{
        setAdventure(modified_adventure)
      }

    }
    const delete_node = (node) => {
      const changed_nodes = nodes.filter(x => x !== node)
      if(changed_nodes.length)
        setActiveTab(changed_nodes[0].id)
      setAdventure(updateProp(adventure,"nodes",changed_nodes))
      
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
              {nodes.map(node => (<Nav.Item key={node.id}><Nav.Link eventKey={node.id}>{node.name}</Nav.Link></Nav.Item>))}
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