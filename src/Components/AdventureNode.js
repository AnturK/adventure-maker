import React, { useRef } from 'react';
import { Button, Col, Container, Row, Card, ListGroup, FormControl, FormGroup, Form, ListGroupItem, InputGroup } from 'react-bootstrap'
import { useRecoilState } from 'recoil'
import default_image from '../signal_lost.png'
import { updateProp } from '../Helpers'
import { NodeSelector, ChoiceData } from '../State'
import { AdventureChoice } from './AdventureChoice'
import { EffectBuilder } from './EffectBuilder'


export function AdventureNode(props) {
    const handleNodeDeletion = props.handleNodeDeletion

    const [node, setNode] = useRecoilState(NodeSelector(props.node.id))

    const update_node_name = (e) => {
        const modified_node = updateProp(node, "name", e.target.value)
        setNode(modified_node)
    }

    const addChoice = (new_choice) => {
        const new_choices = [...props.node.choices, new_choice]
        setNode(updateProp(node, "choices", new_choices))
    }

    const removeChoice = (removed) => {
        const new_choices = props.node.choices.filter(x => x !== removed)
        setNode(updateProp(node, "choices", new_choices))
    }
    const updateChoice = (old_choice, new_choice) => {
        const new_choices = props.node.choices.slice()
        new_choices[props.node.choices.indexOf(old_choice)] = new_choice
        setNode(updateProp(node, "choices", new_choices))
    }

    const addEffect = (effect_prop, new_effect) => {
        const old_effects = props.node[effect_prop]
        const new_effects = old_effects !== undefined ? [...old_effects, new_effect] : [new_effect]
        setNode(updateProp(node, effect_prop, new_effects))
    }

    const updateEffects = (effect_prop, old_effect, changed_prop, new_value) => {
        const changed_effect = { ...old_effect, [changed_prop]: new_value }
        const new_effects = props.node[effect_prop].slice()
        new_effects[props.node[effect_prop].indexOf(old_effect)] = changed_effect
        setNode(updateProp(node, effect_prop, new_effects))
    }

    const deleteEffect = (effect_prop, removed) => {
        const new_effects = props.node[effect_prop].filter(x => x !== removed)
        setNode(updateProp(node, effect_prop, new_effects.length ? new_effects : undefined))
    }

    const current_image = node.raw_image ? node.raw_image : default_image
    const imageInput = useRef()
    const try_uploading_image = () => {
        imageInput.current.click() //god why
    }

    const setUploadedImage = (e) => {
        
        var reader = new FileReader()
        reader.onload = (e) => {
            var uploaded_image = new Image()
            uploaded_image.src = e.target.result
            if(uploaded_image.width !== 200 || uploaded_image.height !== 100){
                alert("Adventure images need to be be 200x100 pngs.")
                return
            }
            const modified_node = {...node,
                raw_image:e.target.result,
                image:null
            }
            setNode(modified_node)
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const reset_image = (e) => {
        const modified_node = {...node,
            raw_image:undefined,
            image:"default"
        }
        setNode(modified_node)
    }

    const update_image = e => {
        setNode(updateProp(node,"image",e.target.value))
    }

    const image_name_text = node.raw_image ? "custom image data" : node.image
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>{node.name} <Button variant="danger" onClick={handleNodeDeletion}>Delete</Button></Card.Title>
                            <Card.Img variant="top" src={current_image}  />
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Image</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control value={image_name_text} readOnly={node.raw_image !== undefined} onChange={update_image}/>
                                <Form.File type='file' accept="image/png" ref={imageInput} onChange={setUploadedImage} style={{display:"none"}}/>
                                <InputGroup.Append>
                                    <Button onClick={try_uploading_image}>Custom</Button>
                                    <Button onClick={reset_image}>Reset</Button>
                                </InputGroup.Append>
                            </InputGroup>
                            <FormGroup>
                                <Form.Label>Node ID</Form.Label>
                                <FormControl value={node.name} onChange={update_node_name} />
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Description</Form.Label>
                                <FormControl as="textarea" rows={5} placeholder="Describe whatever here." value={node.description} onChange={(e) => setNode(updateProp(node, "description", e.target.value))} />
                            </FormGroup>
                            <EffectBuilder
                                title="On Enter Effects"
                                effects={node.on_enter_effects}
                                handleEffectAdded={added => addEffect("on_enter_effects", added)}
                                handleEffectsChanged={(old, prop, new_value) => updateEffects("on_enter_effects", old, prop, new_value)}
                                handleEffectDeleted={deleted => deleteEffect("on_enter_effects", deleted)} />
                            <EffectBuilder
                                title="On Exit Effects"
                                effects={node.on_exit_effects}
                                parent_id={node.id}
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
                                {node.choices.map(choice => (
                                    <ListGroup.Item key={choice.id}>
                                        <AdventureChoice
                                            choice={choice}
                                            handleChoiceDeletion={() => removeChoice(choice)}
                                            handleChoiceChange={(choice_property, new_value) => {
                                                const new_choice = { ...choice, [choice_property]: new_value }
                                                updateChoice(choice, new_choice)
                                            }}
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