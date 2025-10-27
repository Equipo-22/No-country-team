import { SlNotebook } from "react-icons/sl";
import { IoDocumentTextOutline, IoHomeOutline } from "react-icons/io5"
import { MdOutlinePerson2 } from "react-icons/md"

export const data_dashboard = [
  { id: 1, Icon: IoHomeOutline, info: "Inicio", href: "/dashboard-patient/inicio" },
  { id: 2, Icon: MdOutlinePerson2, info: "Perfil", href: "/dashboard-patient/profile" },
  { id: 3, Icon: IoDocumentTextOutline, info: "Mis Citas", href: "/dashboard-patient/appointment" },
]
export const data_dashbouard_config = [
  { id: 2, Icon: SlNotebook, info: "Historia clínica", href: "/dashboard-patient/medical-record" },
]