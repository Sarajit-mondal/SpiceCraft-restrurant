import PropTypes from 'prop-types'
import queryString from 'query-string';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CategoryBox = ({ label, icon: Icon }) => {
  const navigate =useNavigate()
  const [params,setParams] = useSearchParams()
  const currentCategory = params.get('category')

  const handleClick =(label)=>{
    const currentQuery = {category : label}
    const url = queryString.stringifyUrl({
      url : "/",
      query:currentQuery
    })
    navigate(url)
    // console.log(url)
  }
  return (
    <div onClick={()=> handleClick(label)} 
      className={`flex 
  flex-col 
  items-center 
  justify-center 
  gap-2
  p-3
  border-b-2
  hover:text-neutral-800
  transition
  cursor-pointer
   ${label === currentCategory && 'border-b-2 border-neutral-800 text-neutral-700'}`}
    >
      <Icon size={26} />
      <div className='text-sm font-medium'>{label}</div>
    </div>
  )
}

CategoryBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
}

export default CategoryBox
