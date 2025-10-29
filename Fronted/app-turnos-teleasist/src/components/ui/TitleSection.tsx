type TitleSectionProps = {
  text: string
}


const TitleSection = ({text}:TitleSectionProps) => {
  return (
     <p className="text-2xl md:text-3xl text-secondary font-semibold mb-2">{text}</p>
  )
}

export default TitleSection
