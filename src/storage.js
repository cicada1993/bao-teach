import localForage from 'localforage'

const DB_NAME = "EM_PROJ"
const STORE_USER = "user_store"
const STORE_OTHER = "other_store"
let userStore = localForage.createInstance(
    {
        name: DB_NAME,
        storeName: STORE_USER
    }
)
let otherStore = localForage.createInstance(
    {
        name: DB_NAME,
        storeName: STORE_OTHER
    }
)

function dropDB() {
    return localForage.dropInstance({ name: DB_NAME })
}

function dropUserStore() {
    return localForage.dropInstance(
        {
            name: DB_NAME,
            storeName: STORE_USER
        }
    )
}

function dropOtherStore() {
    return localForage.dropInstance(
        {
            name: DB_NAME,
            storeName: STORE_OTHER
        }
    )
}


export {
    userStore,
    otherStore,
    dropDB,
    dropUserStore,
    dropOtherStore
}
