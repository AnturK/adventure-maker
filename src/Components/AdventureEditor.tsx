import React,{useRef, useState} from 'react'
import { Button, Col, Container, Row, Tab, Nav, FormControl, FormGroup, Form, ButtonGroup,Modal, OverlayTrigger,Tooltip, ButtonToolbar } from 'react-bootstrap'
import {useRecoilState, useRecoilValue} from 'recoil'
import {AdventureState,NodesSelector,NodeData,TriggersSelector,TriggerData, unique_id} from '../State'
import {updateProp} from '../Helpers'
import {AdventureNode} from './AdventureNode'
import {AdventureTrigger} from './AdventureTrigger'
import {BasicCollapsible,NodeSelectionDropdown, KeyValueList, SimpleList} from './Utility'
import {scan_bands, loot_types, site_traits} from '../ExternalDefines'
import { AdventurePlayer } from './AdventurePlayer'
import example_adventure from '../example/Theres_a_tree_in_the_middle_of_space.json'


export function AdventureEditor() {
    const [adventure,setAdventure] = useRecoilState(AdventureState);
    const nodes = useRecoilValue(NodesSelector)
    const triggers = useRecoilValue(TriggersSelector)

    const [activeTab,setActiveTab] = useState("")
    const [draggedItem,setDraggedItem] = useState(null)
   
    const add_node = () => {
      const modified_adventure = {...adventure,
        nodes:[...nodes,new NodeData()]
      }
      setAdventure(modified_adventure)
    }
    const delete_node = (node) => {
      var old_index = nodes.findIndex(x => x === node)
      const changed_nodes = nodes.filter(x => x !== node)
      setAdventure(updateProp(adventure,"nodes",changed_nodes))
      if(changed_nodes.length){
          const new_index = Math.max(0,old_index -1)
          setActiveTab(changed_nodes[new_index].id)
      }
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

    const importAdventure = (jsonData) => {
      const json = JSON.parse(jsonData);
      const reindexed_nodes = regenerate_ids(json.nodes)
      const reindexed_triggers = regenerate_trigger_ids(json.triggers)

      const modified_adventure = {...adventure,
        name:json.adventure_name,
        author : json.author,
        starting_node:json.starting_node,
        starting_qualities:json.starting_qualities,
        required_site_traits:json.required_site_traits,
        band_modifiers:json.scan_band_mods,
        loot_types:json.loot_categories,
        triggers:reindexed_triggers,
        nodes:reindexed_nodes
      }
      setAdventure(modified_adventure)
    }
  
    const handleImport = e => {
      var reader = new FileReader()
      reader.onload = (e) =>{
        
        importAdventure(e.target.result as string)
      }
      reader.readAsText(e.target.files[0])
    }

    const handleExample = e => {
      importAdventure(JSON.stringify(example_adventure))
    }

    const ImportInput = useRef<HTMLInputElement>()
    const clickImport = () => {
      ImportInput.current.click()
    }

    const ExportLink = useRef<HTMLAnchorElement>()

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

    const renderTooltip = (text) => (props) => (
      <Tooltip id="button-tooltip" {...props}>
        {text}
      </Tooltip>
    );

    return (
    <>
    <Modal show={playing} onHide={toggle_playing}>
      <AdventurePlayer adventure={adventure}/>
    </Modal>
    <Container>
      <Row>
        <Col>
        <ButtonToolbar>
        <ButtonGroup className="mr-2">
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
        <ButtonGroup>
          <OverlayTrigger placement="right" overlay={renderTooltip("Loads example adventure")}>
            <Button onClick={handleExample}>Load Example Adventure</Button>
          </OverlayTrigger>
        </ButtonGroup>
        </ButtonToolbar>
        </Col>
      </Row>
      <Row>
        <Col>
        <BasicCollapsible title="Adventure Config">
            <Form>
              <FormGroup>
                <Form.Label>Adventure name</Form.Label>
                <Form.Text muted>Adventure name, should be specific as possible since it needs to be unique among all adventures</Form.Text>
                <FormControl placeholder="New adventure" value={adventure.name} onChange={(e) => setAdventure(updateProp(adventure,"name",e.target.value))} />
              </FormGroup>
              <FormGroup>
                <Form.Label>Author</Form.Label>
                <Form.Text muted>Your name</Form.Text>
                <FormControl value={adventure.author} onChange={(e) => setAdventure(updateProp(adventure,"author",e.target.value))} />
              </FormGroup>
              <FormGroup>
                <Form.Label>Starting node</Form.Label>
                <Form.Text muted>This is the node the adventure will being at. On Enter effects WILL fire for this node.</Form.Text>
                <NodeSelectionDropdown value={startingNode} onChange={(e) => setAdventure(updateProp(adventure,"starting_node",e.target.value))} allowCustom={false}/>
              </FormGroup>
              <FormGroup>
                <Form.Label>Starting qualities</Form.Label>
                <Form.Text muted>These qualities will be set once before adventure begins on top of qualities provided by drone equipment.</Form.Text>
                <KeyValueList adventureProp="starting_qualities"/>
              </FormGroup>
              <FormGroup>
                <Form.Label>Required site traits</Form.Label>
                <Form.Text muted>This adventure will only appear on exploration sites with all these traits</Form.Text>
                <SimpleList presetValues={site_traits} adventureProp="required_site_traits"/>
              </FormGroup>
              <FormGroup>
                <Form.Label>Loot type</Form.Label>
                <Form.Text muted>Generator type used for adventure loot when win node is reached.</Form.Text>
                <SimpleList presetValues={loot_types} adventureProp="loot_types"/>
              </FormGroup>
              <FormGroup>
                <Form.Label>Scanning modifiers</Form.Label>
                <Form.Text muted>These modifiers will be applied to point scan results of the exploration site with this adventure.</Form.Text>
                <KeyValueList presetKeys={scan_bands} adventureProp="band_modifiers"/>
              </FormGroup>
              <FormGroup>
                <Form.Label>Deep scan description</Form.Label>
                <Form.Text muted>This description will be added to exploration site's description after a deep scan.</Form.Text>
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
            <Row><Col><Form.Text muted>Triggers are checks that happen after any quality changes. If requirements are met the effects and/or node changes are applied over the choice that made it happen.</Form.Text></Col></Row>
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