import { Form, useNavigate, redirect } from "react-router-dom"
import { eliminarCliente } from "../data/clientes"

export async function action({ params }) {
    await eliminarCliente(params.clienteId)
    return redirect('/')
}
const Cliente = ({ cliente }) => {

    const navigate = useNavigate()

    const { id, nombre, telefono, email, empresa } = cliente

    return (
        <tr className="border-b">

            <td className="p-4 space-y-1">
                <p className=" text-2xl text-gray-800">
                    {nombre}
                </p>
                <p className="text-gray-700">
                    {empresa}
                </p>
            </td>

            <td className="p-4 space-y-1">
                <p className="text-gray-700">
                    <span className="text-gray-800 uppercase font-bold">
                        Email: </span>{email}
                </p>
                <p className="text-gray-700">
                    <span className="text-gray-800 uppercase font-bold">
                        Tel: </span>{telefono}
                </p>
            </td>

            <td className="p-4 flex gap-3 justify-center">
                <button
                    type="button"
                    className="bg-blue-800 hover:bg-blue-950 text-white uppercase font-bold text-xs p-3 rounded-lg flex items-center justify-center w-10 h-10"
                    onClick={() => navigate(`/clientes/${id}/editar`)}>
                    <span className="material-icons">edit</span>
                </button>
                <Form
                    method="post"
                    action={`/clientes/${id}/eliminar`}
                    onSubmit={(e) => {
                        if (!confirm('¿Deseas eliminar este registro?')) { e.preventDefault() }
                    }}>
                    <button
                        type="submit"
                        className="bg-red-700 hover:bg-red-800 text-white uppercase font-bold text-xs p-3 rounded-lg flex items-center justify-center w-10 h-10">
                        <span className="material-icons">delete</span>
                    </button>
                </Form>
            </td>

        </tr>
    )
}

export default Cliente
