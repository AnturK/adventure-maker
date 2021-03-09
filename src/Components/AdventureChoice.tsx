import React,{useState} from 'react'
import {Button, Card, InputGroup, FormControl,Form } from 'react-bootstrap'
import {EffectBuilder} from './EffectBuilder'
import {RequirementsBuilder} from './RequirementsBuilder'
import {convertNumberValue} from '../Helpers'
import { NodeSelectionDropdown } from './Utility'

export function AdventureChoice(props) {
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
    const [exitNodeSelectValue, setExitNodeSelectValue] = useState(props.choice.exit_node);
  
    const changeExitNode = (e) => {
      setExitNodeSelectValue(e.target.value)
      handleChoiceChange("exit_node", e.target.value)
    }
  
  
    return (
      <Card>
        <Card.Body>
          <Form.Text muted>Choice text visible to the player.</Form.Text>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Choice</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl value={props.choice.name} onChange={(e) => handleChoiceChange("name", e.target.value)} />
            <InputGroup.Append>
              <Button variant="danger" onClick={handleChoiceDeletion}>Delete</Button>
            </InputGroup.Append>
          </InputGroup>
          <Form.Text muted>The node navigated to by choosing this choice.</Form.Text>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Exit Node</InputGroup.Text>
            </InputGroup.Prepend>
            <NodeSelectionDropdown value={exitNodeSelectValue} onChange={changeExitNode} allowNone={false}/>
          </InputGroup>
          <Form.Text muted>Delay between selecting the choice and entering exit node.</Form.Text>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Delay(ds)</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl value={props.choice.delay} onChange={(e) => handleChoiceChange("delay", convertNumberValue(e.target.value))} />
            <InputGroup.Text>Message</InputGroup.Text>
            <FormControl value={props.choice.delay_message} onChange={(e) => handleChoiceChange("delay_message", e.target.value)} />
          </InputGroup>
          <Form.Text muted>Quality changes that happen on selecting this choice. (Before navigating to exit node)</Form.Text>
          <EffectBuilder
              title="Selection Effects"
              effects={props.choice.on_selection_effects}
              handleEffectAdded={added => addEffect("on_selection_effects", added)}
              handleEffectsChanged={(old, prop, new_value) => updateEffects("on_selection_effects", old, prop, new_value)}
              handleEffectDeleted={deleted => deleteEffect("on_selection_effects", deleted)}/>
          <Form.Text muted>Qualities required for this choice to be availible. Empty set means it's always viable.</Form.Text>
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