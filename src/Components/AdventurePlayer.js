import React, { useState } from 'react';
import { Button, Col, Container, Row, Card,Alert,Table } from 'react-bootstrap'
import {preset_images,EffectTypes,ValueTypes} from '../ExternalDefines'
import {useRecoilState} from 'recoil'
import { AdventureState } from '../State';


export function AdventurePlayer(props) {

    const [adventure] = useRecoilState(AdventureState)

    const [currentNode,setCurrentNode] = useState(adventure.nodes.find(node => node.name === adventure.starting_node) || adventure.nodes[0])
    const [qualities,setQualities] = useState(adventure.starting_qualities)
    const [prevNode,setPrevNode] = useState(currentNode ? currentNode.name : "")
    
    const restart_test = () => {
        setCurrentNode(adventure.nodes.find(node => node.name === adventure.starting_node) || adventure.nodes[0])
        setQualities(adventure.starting_qualities)
        setPrevNode(currentNode.name)
    }

    const checkReq = req => {
        switch(req.operator){
            case "==":
                if(qualities[req.quality] === req.value)
                    return true
                break
            case "!=":
                if(qualities[req.quality] !== req.value)
                    return true
                break
            case "<=":
                if(qualities[req.quality] <= req.value)
                    return true
                break
            case ">=":
                if(qualities[req.quality] >= req.value)
                    return true
                break
            case ">":
                if(qualities[req.quality] > req.value)
                    return true
                break
            case "<":
                if(qualities[req.quality] < req.value)
                    return true
                break
            default:
                alert("Unknown operator")
        }
    }

    const check_group = (req_group,group_type) => {
        switch(group_type){
            case "AND":
                for(let req of req_group){
                    if(req.group_type !== undefined){
                        if(!check_group(req.requirements,req.group_type))
                            return false;
                    }
                    if(!checkReq(req))
                        return false
                }
                return true;
            case "OR":
                for(let req of req_group){
                    if(req.group_type !== undefined){
                        if(check_group(req,req.group_type))
                            return true;
                    }
                    if(checkReq(req))
                        return true;
                }
                return false;
            default:
                alert("wrong group_type")
        }
    }

    const checkChoice = choice => {
        if(choice.requirements === undefined)
            return true
        return check_group(choice.requirements,"AND")
    }

    const navigateToNode = node_name => {
        if(currentNode.on_exit_effects !== undefined){
            if(apply_effects(currentNode.on_exit_effects))
                return
        }
        switch(node_name){
            case "WIN":
                alert("Here you would complete the adventure in real game and recieve loot.")
                break
            case "FAIL":
                alert("Here you would lose the adventure in real game and get dealt half integrity as damage.")
                break
            case "FAIL_DEATH":
                alert("Here you would lose the adventure in real game and blown up.")
                break
            case "GO_BACK":
                navigateToNode(prevNode.name)
                break
            default:
                const next_node = adventure.nodes.find(node => node.name === node_name)
                setCurrentNode(next_node)
                if(prevNode !== next_node.name)
                    setPrevNode(next_node.name)
                if(next_node.on_enter_effects !== undefined){
                    if(apply_effects(next_node.on_enter_effects))
                        return
                }
        }
    }
    const triggerGuard = []
    const checkTriggers = () => {
        if(adventure.triggers !== undefined){
            for (let trigger of adventure.triggers) {
                if(!check_group(trigger.requirements,"AND"))
                    continue
                if(triggerGuard.includes(trigger)){
                    alert(`Recursive trigger detected. ${trigger.name}`)
                    continue
                }
                triggerGuard.push(trigger)
                if(trigger.on_trigger_effects !== undefined){
                    if(apply_effects(trigger.on_trigger_effects))
                        return true
                }
                if(trigger.target_node !== undefined)
                    navigateToNode(trigger.target_node)
                    return true
            }
        }
        triggerGuard.length = 0
        return false;
    }

    ///thanks mdn
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    const extractValue = value => {
        if(value === Object(value)){
            switch(value.value_type){
                case ValueTypes.random:
                    return getRandomInt(value.low,value.high)
                default:
                    alert("wrong value type")
            }
        }
        return value;
    }

    const apply_effects = effect_list => {
        for (let effect of effect_list) {
            const extractedValue = extractValue(effect.value)
            switch(effect.effect_type){
                case EffectTypes.Add:
                    const a = {...qualities,[effect.quality]:(qualities[effect.quality] || 0)+extractedValue}
                    setQualities(a)
                    break;
                case EffectTypes.Set:
                    const b = {...qualities,[effect.quality]:extractedValue}
                    setQualities(b)
                    break;
                case EffectTypes.Remove:
                    const c = {...qualities}
                    delete c[effect.quality]
                    setQualities(c)
                    break;
                default:
                    alert("wrong effect type")
            }
        }
        if(checkTriggers())
            return true
        return false;
    }

    const selectChoice = (choice) => {
        if(choice.on_selection_effects !== undefined){
            if(apply_effects(choice.on_selection_effects))
                return
        }
        navigateToNode(choice.exit_node)
    }

    if(!currentNode)
        return (<Alert variant="danger">You need at least one node to play.</Alert>)

    return (
        <Container>
            <Alert variant="danger">Delays are not implemented. Choices shown as disabled would not be visible in-game</Alert>
            <Row>
                <Col>
                    <Button onClick={restart_test}>Restart</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Img src={currentNode.raw_image ? currentNode.raw_image : preset_images[currentNode.image]}/>
                        <Card.Body>
                            <Card.Text>{currentNode.description}</Card.Text>
                            <Container>
                                {currentNode.choices.map(choice => (
                                    <Row key={choice.id}><Col><Button disabled={!checkChoice(choice)} onClick={() => selectChoice(choice)}>{choice.name}</Button></Col></Row>
                                ))}
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Table>
                    <thead>
                        <tr>
                            <th>Quality</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(qualities).map(qname => (<tr key={qname}><td>{qname}</td><td>{qualities[qname]}</td></tr>)) }
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}