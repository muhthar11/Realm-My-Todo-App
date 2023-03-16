import {createRealmContext} from '@realm/react'
import {Item1}  from './ItemSchema'

export const realmContext = createRealmContext({
    schema:[Item1],
})