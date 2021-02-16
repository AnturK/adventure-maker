import React, { useRef } from 'react';
import { Button, Col, Container, Row, Card, CardGroup, ListGroup, FormControl, FormGroup, Form, ListGroupItem, InputGroup } from 'react-bootstrap'
import { useRecoilState } from 'recoil'
import { updateProp } from '../Helpers'
import { TriggerSelector } from '../State'
import { RequirementsBuilder } from './RequirementsBuilder'
import { EffectBuilder } from './EffectBuilder'


export function AdventureTrigger(props) {
    const handleDeletion = props.handleDeletion

    const [trigger, setTrigger] = useRecoilState(TriggerSelector(props.trigger.id))

    const update_trigger_name = (e) => {
        setTrigger(updateProp(trigger, "name", e.target.value))
    }

    const addEffect = (effect_prop, new_effect) => {
        const old_effects = props.trigger[effect_prop]
        const new_effects = old_effects !== undefined ? [...old_effects, new_effect] : [new_effect]
        setTrigger(updateProp(trigger, effect_prop, new_effects))
    }

    const updateEffects = (effect_prop, old_effect, changed_prop, new_value) => {
        const changed_effect = { ...old_effect, [changed_prop]: new_value }
        const new_effects = props.trigger[effect_prop].slice()
        new_effects[props.trigger[effect_prop].indexOf(old_effect)] = changed_effect
        setTrigger(updateProp(trigger, effect_prop, new_effects))
    }

    const deleteEffect = (effect_prop, removed) => {
        const new_effects = props.trigger[effect_prop].filter(x => x !== removed)
        setTrigger(updateProp(trigger, effect_prop, new_effects.length ? new_effects : undefined))
    }

    const addRequirement = added => {
        const old_reqs = props.trigger.requirements
        const new_reqs = old_reqs !== undefined ? [...old_reqs, added] : [added]
        setTrigger(updateProp(trigger,"requirements", new_reqs))
    }

    const deleteRequirement = removed => {
        const new_reqs = props.trigger.requirements.filter(x => x !== removed)
        setTrigger(updateProp(trigger,"requirements",  new_reqs.length ? new_reqs : undefined))
    }

    const updateRequirements = (old_req, changed_prop, new_value) => {
        const changed_req = { ...old_req, [changed_prop]: new_value }
        const new_reqs = props.trigger.requirements.slice()
        new_reqs[props.trigger.requirements.indexOf(old_req)] = changed_req
        setTrigger(updateProp(trigger,"requirements",  new_reqs))
    }


    return (
        <ListGroupItem>
            <FormGroup>
                <Form.Label>Trigger ID</Form.Label>
                <FormControl value={trigger.name} onChange={update_trigger_name} />
                <Button variant="danger" onClick={handleDeletion}>Delete</Button>
            </FormGroup>
            <FormGroup>
                <Form.Label>Target Node On Trigger</Form.Label>
                <FormControl value={trigger.target_node} onChange={update_trigger_name} />
            </FormGroup>
            <EffectBuilder
                title="On Trigger Effects"
                effects={trigger.on_trigger_effects}
                handleEffectAdded={added => addEffect("on_trigger_effects", added)}
                handleEffectsChanged={(old, prop, new_value) => updateEffects("on_trigger_effects", old, prop, new_value)}
                handleEffectDeleted={deleted => deleteEffect("on_trigger_effects", deleted)} />
            <RequirementsBuilder
                title="Trigger Requirements"
                requirements={props.trigger.requirements}
                handleRequirementAdded={addRequirement}
                handleRequirementDeleted={deleteRequirement}
                handleRequirementsChanged={updateRequirements}
            />
        </ListGroupItem>

    )
}