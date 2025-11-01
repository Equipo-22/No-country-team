"use client"

import { useState, useEffect } from "react"
import ResetPass from "./ResetPass"
import Success from "./Success"
import Modal from "@/components/ui/modal"

type resetPassModalProps = {
    isOpen: boolean;
    onClose: () => void
}

const ResetPasswordModal = ({ isOpen, onClose }: resetPassModalProps) => {
    const [view, setView] = useState<"reset" | "success">("reset")

        useEffect(() => {
            let timer: NodeJS.Timeout
            if (view === "success") {
                timer = setTimeout(() => {
                    handleClose()
                }, 5000)
            }
            return () => clearTimeout(timer)
        }, [view])

    const handleSuccess = () => {
        setView("success")
    }

    const handleClose = () => {
        setView("reset")
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            {view === "reset" && <div className="flex justify-center"><ResetPass onSuccess={handleSuccess} /></div>}
            {view === "success" && <Success text="Tu contraseña se cambió exitosamente" buttonText="Cerrar" onClick={handleClose} />}
        </Modal>
    )
}

export default ResetPasswordModal
