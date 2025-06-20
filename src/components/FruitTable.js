
const fruitAttributes = [
    "Nombre",
    "Color",
    "Precio",
    "Descripción"
]

const fruits = [
    [
        "Manzana",
        "Roja",
        "1.50",
        "Descripción"
    ],
    [
        "Pera",
        "Verde",
        "2.00",
        "Descripción"
    ],
    [
        "Banana",
        "Amarilla",
        "1.00",
        "Descripción"
    ]
]

export default function FruitTable() {
    return (
        <table>
            <thead>
                <FruitRow values={fruitAttributes} isHeader={true} />
            </thead>
            <tbody>
                <FruitRows fruits={fruits} />
            </tbody>
        </table>
    );
}

function FruitRows({ fruits }) {
    return (
        fruits.map((fruit) => (<FruitRow values={fruit} />))
    )
}

function FruitRow({ values, isHeader = false }) {
    console.log("values", values)
    return (
        <tr>
            {
                values.map((value) => (isHeader ? <th>{value}</th> : <td>{value}</td>))
            }
        </tr>
    )
}

