import { CalcPropType } from '../types/interfaces'


const Calculation : React.FC<CalcPropType> = ({ people } ) => {
  return (
    <div>
      {people.length}
    </div>
  )
}

export default Calculation
