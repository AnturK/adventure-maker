import React, { useState } from 'react';
import { Button, Col, Container, Row, Card,Alert,Table } from 'react-bootstrap'
import {preset_images,EffectTypes,ValueTypes} from '../ExternalDefines'
import {useRecoilState} from 'recoil'
import { AdventureState, TriggerData } from '../State';


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

    const checkReq = (req, qstore) => {
        switch(req.operator){
            case "==":
                if(qstore[req.quality] === req.value)
                    return true
                break
            case "!=":
                if(qstore[req.quality] !== req.value)
                    return true
                break
            case "<=":
                if(qstore[req.quality] <= req.value)
                    return true
                break
            case ">=":
                if(qstore[req.quality] >= req.value)
                    return true
                break
            case ">":
                if(qstore[req.quality] > req.value)
                    return true
                break
            case "<":
                if(qstore[req.quality] < req.value)
                    return true
                break
            default:
                alert("Unknown operator")
        }
    }

    const check_group = (req_group,group_type,qstore) => {
        switch(group_type){
            case "AND":
                for(let req of req_group){
                    if(req.group_type !== undefined){
                        if(!check_group(req.requirements,req.group_type,qstore))
                            return false;
                    }else if(!checkReq(req,qstore))
                        return false
                }
                return true;
            case "OR":
                for(let req of req_group){
                    if(req.group_type !== undefined){
                        if(check_group(req,req.group_type,qstore))
                            return true;
                    }else if(checkReq(req,qstore))
                        return true;
                }
                return false;
            default:
                alert("wrong group_type")
        }
    }

    const checkChoice = (choice,qstore) => {
        if(choice.requirements === undefined)
            return true
        return check_group(choice.requirements,"AND",qstore)
    }

    const navigateToNode = (node_name,qstore) => {
        if(currentNode.on_exit_effects !== undefined){
            if(apply_effects(currentNode.on_exit_effects,qstore))
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
                navigateToNode(prevNode,qstore)
                break
            default:
                const next_node = adventure.nodes.find(node => node.name === node_name)
                setCurrentNode(next_node)
                if(prevNode !== next_node.name)
                    setPrevNode(next_node.name)
                if(next_node.on_enter_effects !== undefined){
                    if(apply_effects(next_node.on_enter_effects,qstore))
                        return
                }
        }
    }
    const triggerGuard : Array<TriggerData> = []
    const checkTriggers = (qstore) => {
        if(adventure.triggers !== undefined){
            for (let trigger of adventure.triggers) {
                if(!check_group(trigger.requirements,"AND",qstore))
                    continue
                if(triggerGuard.includes(trigger)){
                    alert(`Recursive trigger detected. ${trigger.name}`)
                    continue
                }
                triggerGuard.push(trigger)
                if(trigger.on_trigger_effects !== undefined){
                    if(apply_effects(trigger.on_trigger_effects,qstore))
                        return true
                }
                if(trigger.target_node !== undefined)
                    navigateToNode(trigger.target_node,qstore)
                    return true
            }
        }
        triggerGuard.length = 0
        return false;
    }

    ///thanks mdn
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max+1); //[x..y] not [x..y)
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

    const apply_effects = (effect_list,qstore) => {
        var resulting_qualities = {...qstore}
        for (let effect of effect_list) {
            const extractedValue = extractValue(effect.value)
            switch(effect.effect_type){
                case EffectTypes.Add:
                    resulting_qualities[effect.quality] = (resulting_qualities[effect.quality] || 0) + extractedValue
                    break;
                case EffectTypes.Set:
                    resulting_qualities[effect.quality] = extractedValue
                    break;
                case EffectTypes.Remove:
                    delete resulting_qualities[effect.quality]
                    break;
                default:
                    alert("wrong effect type")
            }
        }
        setQualities(resulting_qualities)
        if(checkTriggers(resulting_qualities))
            return true
        return false;
    }

    const selectChoice = (choice) => {
        const qstore = {...qualities}
        if(choice.on_selection_effects !== undefined){
            if(apply_effects(choice.on_selection_effects,qstore))
                return
        }
        navigateToNode(choice.exit_node,qstore)
    }

    const replaceKeywords = (text : string) => {
        const subRegex = /\$\$(\S*)/g;
        return text.replace(subRegex, (match,g1) => { 
            switch (g1) {
                case "SITE_NAME":
                    return "SITE NAME WOULD GO HERE"
                default:
                    return qualities[g1] as string
            }
         })
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
                            <Card.Text>{replaceKeywords(currentNode.description)}</Card.Text>
                            <Container>
                                {currentNode.choices.map(choice => (
                                    <Row key={choice.id}><Col><Button disabled={!checkChoice(choice,qualities)} onClick={() => selectChoice(choice)}>{choice.name}</Button></Col></Row>
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