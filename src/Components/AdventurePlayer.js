import React, { useState } from 'react';
import { Button, Col, Container, Row, Card,Alert } from 'react-bootstrap'
import {preset_images} from '../ExternalDefines'


export function AdventurePlayer(props) {

    const {
        adventure
    } = props

    const [currentNode,setCurrentNode] = useState(adventure.nodes.find(node => node.name === adventure.starting_node) || adventure.nodes[0])
    const [,setQualities] = useState(adventure.starting_qualities)
    
    const restart_test = () => {
        setCurrentNode(adventure.nodes.find(node => node.name === adventure.starting_node) || adventure.nodes[0])
        setQualities(adventure.starting_qualities)
    }

    const checkChoice = () => {
        return true;
    }

    const selectChoice = choice => {
        setCurrentNode(adventure.nodes.find(node => node.name === choice.exit_node))
    }

    if(!currentNode)
        return (<Alert variant="danger">You need at least one node to play.</Alert>)

    return (
        <Container>
            <Alert variant="danger">Unfinished, this is not representative of how it works in-game for now.</Alert>
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
                                {currentNode.choices.filter(choice => checkChoice(choice)).map(choice => (
                                    <Row><Col><Button onClick={() => selectChoice(choice)}>{choice.name}</Button></Col></Row>
                                ))}
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}