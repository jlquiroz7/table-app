"use client"
import { useState } from "react"

const fruitAttributes = [
    "Nombre",
    "Color",
    "Precio",
    "Descripción",
    "Acciones"
]

const defaultFruits = [
    [
        "Manzana",
        "Roja",
        "1.50",
        "Descripción",
        ""
    ],
    [
        "Pera",
        "Verde",
        "2.00",
        "Descripción",
        ""
    ],
    [
        "Banana",
        "Amarilla",
        "1.00",
        "Descripción",
        ""
    ]
]

export default function FruitTable() {
    const [fruits, setFruits] = useState(defaultFruits);
    const [newFruit, setNewFruit] = useState([
        "",
        "",
        "",
        ""
    ]);

    const onNewFruitChange = (newFruit) => {
        setNewFruit(newFruit);
    }

    const onAddFruit = (fruit) => {
        setFruits([...fruits, fruit]);
        setNewFruit([
            "",
            "",
            "",
            ""
        ]);
    }

    return (
        <table>
            <thead>
                <FruitRow values={fruitAttributes} isHeader={true} />
            </thead>
            <tbody>
                <FruitRows fruits={fruits} />
                <NewFruitRow newFruit={newFruit} onNewFruitChange={onNewFruitChange} onAddFruit={onAddFruit} />
            </tbody>
        </table>
    );
}

function FruitRows({ fruits }) {
    return (
        fruits.map((fruit, index) => (<FruitRow key={index} values={fruit} />))
    )
}

function FruitRow({ values, isHeader = false }) {
    return (
        <tr>
            {
                values.map((value, index) => (isHeader ? <th key={index}>{value}</th> : <td key={index}>{value}</td>))
            }
        </tr>
    )
}

function NewFruitRow({ newFruit, onNewFruitChange, onAddFruit }) {
    const isDisabled = !newFruit[0] || !newFruit[1] || !newFruit[2] || !newFruit[3];
    return (
        <tr>
            <td><input type="text" name="nombre" placeholder="Nombre" value={newFruit[0]} onChange={(e) => onNewFruitChange([ e.target.value, newFruit[1], newFruit[2], newFruit[3] ])} /></td>
            <td><input type="text" name="color" placeholder="Color" value={newFruit[1]} onChange={(e) => onNewFruitChange([ newFruit[0], e.target.value, newFruit[2], newFruit[3] ])} /></td>
            <td><input type="text" name="precio" placeholder="Precio" value={newFruit[2]} onChange={(e) => onNewFruitChange([ newFruit[0], newFruit[1], e.target.value, newFruit[3] ])} /></td>
            <td><input type="text" name="descripcion" placeholder="Descripción" value={newFruit[3]} onChange={(e) => onNewFruitChange([ newFruit[0], newFruit[1], newFruit[2], e.target.value ])} /></td>
            <td><button onClick={() => onAddFruit(newFruit)} disabled={isDisabled}>Agregar</button></td>
        </tr>
    )
}