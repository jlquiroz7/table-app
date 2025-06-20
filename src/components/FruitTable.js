"use client"
import { useState } from "react"
import { FiPlus, FiTrash2, FiEdit2, FiSave, FiX } from 'react-icons/fi';

const fruitAttributes = [
    "Nombre",
    "Color",
    "Precio",
    "Descripción",
    "Acciones"
];

const defaultFruits = [
    [
        "Manzana",
        "Roja",
        "1.50",
        "Manzana roja jugosa",
        ""
    ],
    [
        "Pera",
        "Verde",
        "2.00",
        "Pera dulce y fresca",
        ""
    ],
    [
        "Banana",
        "Amarilla",
        "1.00",
        "Banana madura y dulce",
        ""
    ]
];

export default function FruitTable() {
    const [fruits, setFruits] = useState(defaultFruits);
    const [newFruit, setNewFruit] = useState(["", "", "", ""]);
    const [editingIndex, setEditingIndex] = useState(null);

    const onNewFruitChange = (index, value) => {
        const updatedFruit = [...newFruit];
        updatedFruit[index] = value;
        setNewFruit(updatedFruit);
    };

    const onAddFruit = (e) => {
        e.preventDefault();
        if (newFruit.some(field => !field.trim())) return;
        
        if (editingIndex !== null) {
            // Update existing fruit
            const updatedFruits = [...fruits];
            updatedFruits[editingIndex] = [...newFruit, ""];
            setFruits(updatedFruits);
            setEditingIndex(null);
        } else {
            // Add new fruit
            setFruits([...fruits, [...newFruit, ""]]);
        }
        setNewFruit(["", "", "", ""]);
    };

    const onDeleteFruit = (index) => {
        const updatedFruits = fruits.filter((_, i) => i !== index);
        setFruits(updatedFruits);
    };

    const onEditFruit = (index) => {
        setNewFruit(fruits[index].slice(0, -1));
        setEditingIndex(index);
    };

    const cancelEdit = () => {
        setNewFruit(["", "", "", ""]);
        setEditingIndex(null);
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-medium text-gray-800 mb-6">Tabla de Frutas</h1>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {fruitAttributes.map((attr, index) => (
                                    <th 
                                        key={index}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {attr}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {fruits.map((fruit, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    {fruit.slice(0, -1).map((value, i) => (
                                        <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {value}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => onEditFruit(index)}
                                                className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                                                title="Editar"
                                            >
                                                <FiEdit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => onDeleteFruit(index)}
                                                className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                                                title="Eliminar"
                                            >
                                                <FiTrash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">
                    {editingIndex !== null ? 'Editar Fruta' : 'Añadir Nueva Fruta'}
                </h2>
                <form onSubmit={onAddFruit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {['Nombre', 'Color', 'Precio', 'Descripción'].map((label, index) => (
                            <div key={index} className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                    {label}
                                </label>
                                <input
                                    type={label === 'Precio' ? 'number' : 'text'}
                                    step={label === 'Precio' ? '0.01' : undefined}
                                    value={newFruit[index] || ''}
                                    onChange={(e) => onNewFruitChange(index, e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder={`Ingrese ${label.toLowerCase()}`}
                                    required
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex space-x-3">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <FiPlus className="mr-2" size={16} />
                            {editingIndex !== null ? 'Actualizar' : 'Agregar'}
                        </button>
                        {editingIndex !== null && (
                            <button
                                type="button"
                                onClick={cancelEdit}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FiX className="mr-2" size={16} />
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}