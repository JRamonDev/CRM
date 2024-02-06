import { useLoaderData } from "react-router-dom"
import { obtenerClientes } from "../data/clientes";
import Cliente from "../components/Cliente";

export function loader() {
    const clientes = obtenerClientes()

    return clientes

}
const Index = () => {

    const clientes = useLoaderData()

    return (
        <>
            <h1
                className="font-black text-3xl text-blue-950">
                Clientes
            </h1>
            <p
                className="mt-2 text-blue-950">
                Administra tus Clientes
            </p>
            {clientes.length ? (
                <table className="w-full bg-white shadow mt-5 table-auto rounded" >
                    <thead className=" rounded-lg ">
                        <tr className="bg-blue-950  text-white">
                            <th className="p-2 ">
                                Clientes
                            </th>
                            <th className="p-2">
                                Contacto
                            </th>
                            <th className="p-2">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(cliente => (

                            <Cliente
                                cliente={cliente}
                                key={cliente.id}
                            />

                        ))}
                    </tbody>

                </table >

            ) : (
                <p className="text-center mt-10 "> No Hay Clientes</p >
            )}
        </>
    )
}

export default Index
