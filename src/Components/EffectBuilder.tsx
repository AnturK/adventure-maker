import { Button, Card, ListGroup, FormControl, ListGroupItem, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { EffectData } from '../State'
import { convertNumberValue} from '../Helpers'
import { ValueTypes,EffectTypes } from '../ExternalDefines'

function Effect(props) {
    const handleChange = props.handleChange
    const handleDelete = props.handleDelete
    const value_type = props.effect.value === Object(props.effect.value) ? props.effect.value["value_type"] : "raw"

    const defaultForValueType = value_type => {
        switch(value_type){
            case ValueTypes.raw:
                return 0
            case ValueTypes.random:
               return { "value_type": ValueTypes.random, "low": 0, "high": 0 }
            default:
                return 0
        }
    }

    const toggleSpecialValueType = e => {
        const allowed_types = Object.keys(ValueTypes).map(k => ValueTypes[k])
        const current_index = allowed_types.indexOf(value_type)
        const new_type = allowed_types[(current_index+1)%allowed_types.length]
        handleChange("value",defaultForValueType(new_type))
    }

    const value_type_controls = value_type => {
        switch (value_type) {
            case "random":
                return (
                    <>
                        <InputGroup.Text>Random</InputGroup.Text>
                        <FormControl value={props.effect.value.low} onChange={e => handleChange("value", {...props.effect.value,low:convertNumberValue(e.target.value)})} />
                        <InputGroup.Text>To</InputGroup.Text>
                        <FormControl value={props.effect.value.high} onChange={e => handleChange("value",{...props.effect.value,high:convertNumberValue(e.target.value)})} />
                    </>
                )
            case "raw":
                return (<FormControl value={props.effect.value} onChange={e => handleChange("value", convertNumberValue(e.target.value))} />)
            default:
                return (<InputGroup.Text>Unsupported</InputGroup.Text>)
        }
    }

    const EffectReadme = "Add - Adds/Substracts value from current quality value \n\n Set - Sets quality to value \n\n Remove - resets quality completely"

    return (
        
        <InputGroup>
            <OverlayTrigger placement="top" overlay={<Tooltip id="sorry_accessibilty" style={{whiteSpace:"pre-wrap"}}>{EffectReadme}</Tooltip>}>
            <FormControl as="select" value={props.effect.effect_type} onChange={e => handleChange("effect_type", e.target.value)}>
                {Object.keys(EffectTypes).map(k => (<option key={k}>{EffectTypes[k]}</option>))}
            </FormControl>
            </OverlayTrigger>
            <InputGroup.Prepend>
                <InputGroup.Text>Quality</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl value={props.effect.quality} onChange={e => handleChange("quality", e.target.value)} />
            <InputGroup.Prepend>
                <InputGroup.Text>Value</InputGroup.Text>
            </InputGroup.Prepend>
            {value_type_controls(value_type)}

            <InputGroup.Append>
                <Button onClick={toggleSpecialValueType}>*</Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </InputGroup.Append>
        </InputGroup>)
}

export function EffectBuilder(props) {
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
                        <Effect
                            effect={effect}
                            handleChange={(prop, value) => handleEffectsChanged(effect, prop, value)}
                            handleDelete={(prop, value) => handleEffectDeleted(effect, prop, value)} />
                    </ListGroupItem>))}
                <ListGroupItem>
                    <Button onClick={add_effect}>Add New Effect</Button>
                </ListGroupItem>
            </ListGroup>
        </>)
}