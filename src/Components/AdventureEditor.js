import React,{useRef, useState} from 'react'
import { Button, Col, Container, Row, Tab, Nav, FormControl, FormGroup, Form, ButtonGroup,Modal } from 'react-bootstrap'
import {useRecoilState} from 'recoil'
import {AdventureState,NodesSelector,NodeData,TriggersSelector,TriggerData, unique_id} from './../State'
import {updateProp} from './../Helpers'
import {AdventureNode} from './AdventureNode'
import {AdventureTrigger} from './AdventureTrigger'
import {BasicCollapsible,NodeSelectionDropdown, KeyValueList, SimpleList} from './Utility'
import {scan_bands, loot_types, site_traits} from '../ExternalDefines'
import { AdventurePlayer } from './AdventurePlayer'


export function AdventureEditor() {
    const [adventure,setAdventure] = useRecoilState(AdventureState);
    const [nodes] = useRecoilState(NodesSelector)
    const [triggers] = useRecoilState(TriggersSelector)

    const [activeTab,setActiveTab] = useState("")
    const [draggedItem,setDraggedItem] = useState(null)
   
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
        author : adventure.author,
        starting_node: startingNode,
        starting_qualities: adventure.starting_qualities,
        required_site_traits: adventure.required_site_traits,
        loot_categories : adventure.loot_types,
        scan_band_mods : adventure.band_modifiers,
        deep_scan_description : adventure.deep_scan_description,
        triggers : adventure.triggers,
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
      
      ExportLink.current.href = blob_url
      ExportLink.current.download = `${adventure.name}.json`
      ExportLink.current.click();
    }

    const regenerate_reqs = req_list => {
      for(var req of req_list){
        req.id = unique_id("req")
        if(req.group_type !== undefined){
          if(req.requirements !== undefined)
            regenerate_reqs(req.requirements)
        }
      }
    }

    const regenerate_effects = effects => {
      for(var effect of effects){
        effect.id = unique_id("effect")
      }
    }
    /// Regenerates temporary ids
    const regenerate_ids = node_list =>{
      for(var node of node_list){
        node.id = unique_id("Node")
        for(var choice of node.choices){
          choice.id = unique_id("choice")
          if(choice.on_selection_effects !== undefined){
            regenerate_effects(choice.on_selection_effects)
          }
          if(choice.requirements !== undefined){
            regenerate_reqs(choice.requirements)
          }
        }
        if(node.on_enter_effects !== undefined)
          regenerate_effects(node.on_enter_effects)
        if(node.on_exit_effects !== undefined)
          regenerate_effects(node.on_exit_effects)
      }
      return node_list
    }

    const regenerate_trigger_ids = trigger_list => {
      for(var trigger of trigger_list){
        trigger.id = unique_id("trigger")
        if(trigger.requirements !== undefined){
          regenerate_reqs(trigger.requirements)
        }
        if(trigger.on_trigger_effects !== undefined){
          regenerate_effects(trigger.on_trigger_effects)
        }
      }
      return trigger_list
    }
  
    const handleImport = e => {
      var reader = new FileReader()
      reader.onload = (e) =>{
        const result = JSON.parse(e.target.result)

        const reindexed_nodes = regenerate_ids(result.nodes)
        const reindexed_triggers = regenerate_trigger_ids(result.triggers)

        const modified_adventure = {...adventure,
          name:result.adventure_name,
          author : result.author,
          starting_node:result.starting_node,
          starting_qualities:result.starting_qualities,
          required_site_traits:result.required_site_traits,
          band_modifiers:result.scan_band_mods,
          loot_types:result.loot_categories,
          triggers:reindexed_triggers,
          nodes:reindexed_nodes
        }
        setAdventure(modified_adventure)
      }
      reader.readAsText(e.target.files[0])
    }

    const ImportInput = useRef()
    const clickImport = () => {
      ImportInput.current.click()
    }

    const ExportLink = useRef()

    const start_dragging = (e,node) => {
      setDraggedItem(node)
    } 

    const end_dragging = () => {
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

    const getDefaultTab = () => {
      if(nodes.length)
        return nodes[0].id.toString()
    }
    const openTab = activeTab || getDefaultTab()
    
    const getDefaultStartingNode = () => {
      if(nodes.length)
        return nodes[0].name
    }
    const startingNode = adventure.starting_node || getDefaultStartingNode()


    const [playing,setPlaying] = useState(false)

    const toggle_playing = () => {
      setPlaying(!playing)
    }

    return (
    <>
    <Modal show={playing} onHide={toggle_playing}>
      <AdventurePlayer adventure={adventure}/>
    </Modal>
    <Container>
      <Row>
        <Col>
        <ButtonGroup>
            <Button onClick={handleExport}>Export</Button>
            <a ref={ExportLink} style={{display:"none"}} href="/">God is this really how JS supposed to work</a>
            <Button onClick={clickImport}>Import</Button>
            <Form.File
              onChange={handleImport}
              accept=".json"
              ref={ImportInput}
              style ={{display:"none"}}/>
            <Button onClick={toggle_playing}>Test</Button>
        </ButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col>
        <BasicCollapsible title="Adventure Config">
            <Form>
              <FormGroup>
                <Form.Label>Adventure name</Form.Label>
                <FormControl placeholder="New adventure" value={adventure.name} onChange={(e) => setAdventure(updateProp(adventure,"name",e.target.value))} />
              </FormGroup>
              <FormGroup>
                <Form.Label>Author</Form.Label>
                <FormControl value={adventure.author} onChange={(e) => setAdventure(updateProp(adventure,"author",e.target.value))} />
              </FormGroup>
              <FormGroup>
                <Form.Label>Starting node</Form.Label>
                <NodeSelectionDropdown value={startingNode} onChange={(e) => setAdventure(updateProp(adventure,"starting_node",e.target.value))} allowCustom={false}/>
              </FormGroup>
              <FormGroup>
                <Form.Label>Starting qualities</Form.Label>
                <KeyValueList adventureProp="starting_qualities"/>
              </FormGroup>
              <FormGroup>
                <Form.Label>Required site traits</Form.Label>
                <SimpleList presetValues={site_traits} adventureProp="required_site_traits"/>
              </FormGroup>
              <FormGroup>
                <Form.Label>Loot type</Form.Label>
                <SimpleList presetValues={loot_types} adventureProp="loot_types"/>
              </FormGroup>
              <FormGroup>
                <Form.Label>Scanning modifiers</Form.Label>
                <KeyValueList presetKeys={scan_bands} adventureProp="band_modifiers"/>
              </FormGroup>
              <FormGroup>
                <Form.Label>Deep scan description</Form.Label>
                <FormControl value={adventure.deep_scan_description} onChange={(e) => setAdventure(updateProp(adventure,"deep_scan_description",e.target.value))} />
              </FormGroup>
            </Form>
        </BasicCollapsible>
        </Col>
      </Row>
      <Row>
        <Col>
          <BasicCollapsible title="Nodes">
          <Tab.Container id="nodes" activeKey={openTab} onSelect={e => setActiveTab(e)}>
            <Row>
              <Col>
                <Nav variant="tabs">
                  {nodes.map(node => (
                    <Nav.Item 
                      key={node.id} 
                      draggable 
                      onDragEnd={e => end_dragging(e,node)} 
                      onDragStart={e => start_dragging(e,node)} 
                      onDrop={() => switch_node(node)}
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
          </BasicCollapsible>
        </Col>
      </Row>
      <Row>
        <Col>
        <BasicCollapsible title="Triggers" startCollapsed>
          <Container>
            <Row>
              {triggers.map(trigger => (
                <Col key={trigger.id} xl="auto"><AdventureTrigger trigger={trigger} handleDeletion={() => delete_trigger(trigger)}/></Col>
              ))}
              <Col>
                <Button onClick={add_trigger}>Add Trigger</Button>
              </Col>
            </Row>
          </Container>
        </BasicCollapsible>
        </Col>
      </Row>
    </Container></>)
  }