import createUseContext from 'constate'

import useForm from './useForm'

const useFormContext = createUseContext(useForm)

export default useFormContext
