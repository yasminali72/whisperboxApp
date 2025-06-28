
export default function Input({type,id,name,value,onChange,onBlur}) {
  return (
    <input
    type={type}
    id={id}
    name={name}
    className="block w-full mb-3 p-3 pl-10 border border-gray-300 rounded-md shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
               dark:bg-gray-800 dark:border-gray-600 dark:text-white"
    value={value}
    onChange={onChange}
    onBlur={onBlur}
  />
  
  )
}
