import Success from '@/_components/Success'

const page = () => {
    return (
        <Success text="Tu contraseña se cambió exitosamente" buttonText="Iniciar sesión" redirect="/login" />
    )
}

export default page