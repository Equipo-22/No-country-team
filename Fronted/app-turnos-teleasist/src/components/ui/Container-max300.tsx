import React, { FC, ReactNode } from "react"

const ContainerMax300: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-full max-w-[300px] flex flex-col py-[1rem]">
      {children}
    </div>
  )
}

export default ContainerMax300
