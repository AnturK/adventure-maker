import React, { useRef } from 'react';
import { Button, Card,Image, FormControl, FormGroup, Form, InputGroup } from 'react-bootstrap'
import { useRecoilState } from 'recoil'
import { updateProp } from '../Helpers'
import { NodeSelector, ChoiceData } from '../State'
import { AdventureChoice } from './AdventureChoice'
import { EffectBuilder } from './EffectBuilder'
import {preset_images} from '../ExternalDefines'


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

    const current_image = node.raw_image ? node.raw_image : preset_images[node.image]
    const imageInput = useRef<HTMLInputElement>()
    const try_uploading_image = () => {
        imageInput.current.click() //god why
    }

    const setUploadedImage = (e) => {
        var reader = new FileReader()
        reader.onload = (e) => {
            var uploaded_image = document.createElement('img');
            uploaded_image.onload = () =>{
                if(uploaded_image.width !== 200 || uploaded_image.height !== 100){
                    alert(`Adventure images need to be be 200x100 pngs.`)
                    return
                }
                const modified_node = {...node,
                    raw_image:e.target.result as string,
                    image:null
                }
                setNode(modified_node)
            }
            uploaded_image.src = e.target.result as string
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const reset_image = () => {
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
        <>
                    <Card>
                        <Card.Body>
                            <Card.Title>{node.name} <Button variant="danger" onClick={handleNodeDeletion}>Delete</Button></Card.Title>
                            <Image src={current_image} width="400px" height="200px"/>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Image</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="select" value={image_name_text} readOnly={node.raw_image !== undefined} onChange={update_image}>
                                    {Object.keys(preset_images).map(k => (<option key={k}>{k}</option>))}
                                    </Form.Control>
                                <Form.File type='file' accept="image/png" ref={imageInput} onChange={setUploadedImage} style={{display:"none"}}/>
                                <InputGroup.Append>
                                    <Button onClick={try_uploading_image}>Custom</Button>
                                    <Button onClick={reset_image}>Reset</Button>
                                </InputGroup.Append>
                            </InputGroup>
                            <FormGroup>
                                <Form.Label>Node ID</Form.Label>
                                <Form.Text muted>Node unique ID, this is not visible to the player</Form.Text>
                                <FormControl value={node.name} onChange={update_node_name} />
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Description</Form.Label>
                                <Form.Text muted>Text shown to the player for this node. You can use $$SITE_NAME to insert exploration site name in the text. Use $$QualityName to place current quality value in text.</Form.Text>
                                <FormControl as="textarea" rows={5} placeholder="Describe whatever here." value={node.description} onChange={(e) => setNode(updateProp(node, "description", e.target.value))} />
                            </FormGroup>
                            <Form.Text muted>Quality changes that happen when node is entered by any means.</Form.Text>
                            <EffectBuilder
                                title="On Enter Effects"
                                effects={node.on_enter_effects}
                                handleEffectAdded={added => addEffect("on_enter_effects", added)}
                                handleEffectsChanged={(old, prop, new_value) => updateEffects("on_enter_effects", old, prop, new_value)}
                                handleEffectDeleted={deleted => deleteEffect("on_enter_effects", deleted)} />
                            <Form.Text muted>Quality changes that happen when node is exited by any means.</Form.Text>
                            <EffectBuilder
                                title="On Exit Effects"
                                effects={node.on_exit_effects}
                                parent_id={node.id}
                                handleEffectAdded={added => addEffect("on_exit_effects", added)}
                                handleEffectsChanged={(old, prop, new_value) => updateEffects("on_exit_effects", old, prop, new_value)}
                                handleEffectDeleted={deleted => deleteEffect("on_exit_effects", deleted)} />
                            <Card.Header>Choices</Card.Header>
                                {node.choices.map(choice => (
                                        <AdventureChoice
                                            key={choice.id}
                                            choice={choice}
                                            handleChoiceDeletion={() => removeChoice(choice)}
                                            handleChoiceChange={(choice_property, new_value) => {
                                                const new_choice = { ...choice, [choice_property]: new_value }
                                                updateChoice(choice, new_choice)
                                            }}
                                        />))}
                                <Button onClick={() => addChoice(new ChoiceData())}>Add Choice</Button>
                        </Card.Body>
                    </Card>
            </>
    )
}