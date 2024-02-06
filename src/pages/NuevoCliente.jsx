import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Formulario from "../components/Formulario"
import Error from "../components/Error"
import { agregarCliente } from "../data/clientes"

export async function action({ request }) {
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

    await agregarCliente(datos)

    return redirect('/')
}
const NuevoCliente = () => {

    const errores = useActionData()
    const navigate = useNavigate()
    return (
        <>
            <h1
                className="font-black text-3xl text-blue-950">
                Nuevo Cliente
            </h1>
            <p
                className="mt-2 text-blue-950">
                Llena todos los campos para registrar un nuevo cliente
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
                    <Formulario />

                    <input
                        type="submit"
                        className="mt-5 w-full bg-blue-800 hover:bg-blue-950 rounded text-white font-bold uppercase p-3 text-lg"
                        value='Registrar Cliente'
                    />
                </Form>

            </div>
        </>
    )
}

export default NuevoCliente
