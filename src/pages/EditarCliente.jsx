import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom"
import { obtenerCliente, editarCliente } from "../data/clientes"
import Formulario from "../components/Formulario"
import Error from "../components/Error"

export async function loader({ params }) {
    const cliente = await obtenerCliente(params.clienteId)
    if (Object.values(cliente).length === 0) {

        throw new Response('', {
            status: 404,
            statusText: 'El Cliente no fue encontrado'
        })
    }
    return cliente
}

export async function action({ request, params }) {
    const formData = await request.formData()
    const datos = Object.fromEntries(formData)
    const email = formData.get('email')

    //Validación 
    const errores = []
    if (Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios')
    }
    // Para Validar email   
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if (!regex.test(email)) {
        errores.push('El email no es válido')
    }

    //Retornar datos si hay errores
    if (Object.keys(errores).length) {
        return errores
    }
    //Actualizar cliente
    await editarCliente(params.clienteId, datos)

    return redirect('/')
}
const EditarCliente = () => {

    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()
    return (
        <>
            <h1
                className="font-black text-3xl text-blue-950">
                Editar Cliente
            </h1>
            <p
                className="mt-2 text-blue-950">
                Edita los datos de tu cliente
            </p>

            <div className=" flex justify-end">
                <button
                    className="bg-blue-800 hover:bg-blue-950 text-white px-2 py-1 font-bold uppercase rounded flex justify-center"
                    onClick={() => navigate(-1)}>
                    <span className="material-icons">keyboard_arrow_left</span>
                    Volver
                </button>
            </div>
            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10">
                {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}
                <Form
                    method="post"
                    noValidate
                >
                    <Formulario
                        cliente={cliente}
                        key={cliente.id} />

                    <input
                        type="submit"
                        className="mt-5 w-full bg-blue-800 hover:bg-blue-950 rounded text-white font-bold uppercase p-3 text-lg"
                        value='Guardar Cambios'
                    />
                </Form>

            </div>
        </>
    )
}

export default EditarCliente
