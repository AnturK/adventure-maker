import React, { useState } from 'react'
import { Card, FormControl, Row, Container, Col, InputGroup, Button, FormGroup, Table } from 'react-bootstrap'
import { useRecoilState, useRecoilValue } from 'recoil'
import { AdventureData, AdventureState, NodesSelector } from '../State'
import { special_nodes } from '../ExternalDefines'
import { convertNumberValue, updateProp } from '../Helpers'

export function BasicCollapsible(props) {
    const [sectionCollapsed, setSectionCollapsed] = useState(props.startCollapsed)
    return (
        <Container>
            <Row>
                <Col>
                    <Card.Header onClick={() => setSectionCollapsed(!sectionCollapsed)}><Container><Row><Col className="flex-grow">{props.title}</Col><Col className="flex-grow-0">{sectionCollapsed ? "▼" : "▲"}</Col></Row></Container></Card.Header>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Container className={sectionCollapsed ? "d-none" : ""}>
                        <Row>
                            <Col>
                                {props.children}
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>)
}


export function NodeSelectionDropdown(props) {
    const {
        allowNone = false,
        allowCustom = true,
        ...rest
    } = props;

    const nodes = useRecoilValue(NodesSelector)

    return (<FormControl {...rest} as="select">
        {nodes.map(node => (<option key={node.id}>{node.name}</option>))}
        {!!allowNone && (<option value="">None</option>)}
        {!!allowCustom && (special_nodes.map(name => (<option key={name}>{name}</option>)))}
    </FormControl>)
}

export function KeyValueList(props) {
    const {
        presetKeys,
        adventureProp,
    } = props;

    const [adventure, setAdventure] = useRecoilState(AdventureState)

    const store = adventure[adventureProp]
    const [newKey, setNewKey] = useState(presetKeys ? presetKeys[0] : "")
    const [newValue, setNewValue] = useState<number | string>("")
    const store_keys = Object.keys(store)

    const add_new_kv_pair = () => {
        const newstore = { ...store, [newKey]: newValue }
        setAdventure(updateProp(adventure, adventureProp, newstore))
    }

    const remove_key = key => {
        const newstore = { ...store }
        delete newstore[key]
        setAdventure(updateProp(adventure, adventureProp, newstore))
    }
    return (<Table size="sm">
        <thead>
            <tr>
                <th>Quality</th>
                <th>Value</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {store_keys.map(key => (
                <tr key={key}>
                    <td>{key}</td>
                    <td>{store[key]}</td>
                    <td><Button variant="danger" onClick={() => remove_key(key)}>Delete</Button></td>
                </tr>
            ))}
            <tr>
                <td>{presetKeys ? (<FormControl as="select" value={newKey} onChange={e => setNewKey(e.target.value)} >{presetKeys.map(pk => (<option key={pk}>{pk}</option>))}</FormControl>) : (<FormControl value={newKey} onChange={e => setNewKey(e.target.value)}></FormControl>)}</td>
                <td><FormControl value={newValue} onChange={e => setNewValue(convertNumberValue(e.target.value))}></FormControl></td>
                <td><Button onClick={add_new_kv_pair}>Add</Button></td>
            </tr>
        </tbody>
    </Table>)
}

export function SimpleList(props) {
    const {
        presetValues,
        adventureProp,
        unique = true
    } = props;

    const [adventure, setAdventure] = useRecoilState(AdventureState)
    const store = adventure[adventureProp] || [] 
    const [newValue, setNewValue] = useState(presetValues ? presetValues[0] : "")

    const add_new_value = () => {
        if (unique && store.indexOf(newValue) >= 0)
            return
        const newstore = [...store, newValue]
        setAdventure(updateProp(adventure, adventureProp, newstore))
    }

    const remove_value = key => {
        const newstore = store.filter(x => x !== key)
        setAdventure(updateProp(adventure, adventureProp, newstore))
    }

    return (<FormGroup>
        {store.map(key => (
            <InputGroup key={key}>
                <InputGroup.Text>{key}</InputGroup.Text>
                <InputGroup.Append>
                    <Button variant="danger" onClick={() => remove_value(key)}>X</Button>
                </InputGroup.Append>
            </InputGroup>
        ))}
        <InputGroup>
            <InputGroup.Prepend>
                {presetValues ? (<FormControl as="select" value={newValue} onChange={e => setNewValue(convertNumberValue(e.target.value))} >{presetValues.map(pk => (<option key={pk}>{pk}</option>))}</FormControl>) : (<FormControl value={newValue} onChange={e => setNewValue(convertNumberValue(e.target.value))}></FormControl>)}
            </InputGroup.Prepend>
            <InputGroup.Append>
                <Button onClick={add_new_value}>Add</Button>
            </InputGroup.Append>
        </InputGroup>
    </FormGroup>)
}