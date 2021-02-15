import { Button, Card, ListGroup, FormControl, ListGroupItem, InputGroup } from 'react-bootstrap'
import { EffectData } from './../State'

function Effect(props) {
    const handleChange = props.handleChange
    const handleDelete = props.handleDelete

    return (
        <InputGroup>
            <FormControl as="select" value={props.effect.effect_type} onChange={e => handleChange("effect_type", e.target.value)}>
                <option>add</option>
                <option>remove</option>
                <option>set</option>
            </FormControl>
            <InputGroup.Prepend>
                <InputGroup.Text>Quality</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl value={props.effect.quality} onChange={e => handleChange("quality", e.target.value)} />
            <InputGroup.Prepend>
                <InputGroup.Text>Value</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl value={props.effect.value} onChange={e => handleChange("value", e.target.value)} />
            <InputGroup.Append>
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