import { writable } from 'svelte/store'

type LoadStatus = 'idle' | 'loading' | 'success' | 'error'

type PayloadState<T> = {
    data: T,
    error: string
}

interface PartState<T> {
    loadStaus: LoadStatus,
    completed: boolean
    payload: PayloadState<T>
    child_state?: PartState<any>
}

interface VIN_Payload {
    vin: string
}

interface Component_Payload {
    componentCode: string
}

interface PartNumber_Payload {
    partNumber: string
}

interface Part_1 extends PartState<VIN_Payload> {
}
interface Part_2 extends PartState<Component_Payload> {
}
interface Part_3 extends PartState<PartNumber_Payload> {
}


interface State {
    title: string
    part_1: Part_1,
    part_2: Part_2,
    part_3: Part_3
}

let part_3: Part_3 = {
    loadStaus: 'idle',
    completed: false,
    payload: {
        data: {
            partNumber: null
        },
        error: null
    }
}

let part_2: Part_2  = {
    loadStaus: 'idle',
    completed: false,
    payload: {
        data: {
            componentCode: null
        },
        error: null
    },
    child_state: part_3
}

let part_1: Part_1 = {
    loadStaus: 'idle',
    completed: false,
    payload: {
        data: {
            vin: null
        },
        error: null
    },
    child_state: part_2
}





let _state: State = {
    title: "Multi Part POC",
    part_1: part_1,
    part_2: part_2,
    part_3: part_3
}

let store = writable<State>(_state)

function update_part_loadStatus(partKey: string, status: LoadStatus) {
   
    store.update(s => {
        let part = s[partKey] as PartState<any>
        part.loadStaus = status
        if (status === 'success') {
            part.completed = true
        } 
        return s
    })
}

async function loadPart_1() {
    update_part_loadStatus('part_1', 'loading')
    await delay()
    update_part_loadStatus('part_1', 'success')
}

async function loadPart_2() {
    update_part_loadStatus('part_2', 'loading')
    await delay()
    update_part_loadStatus('part_2', 'success')
}

async function loadPart_3() {
    update_part_loadStatus('part_3', 'loading')
    await delay()
    update_part_loadStatus('part_3', 'success')
}

async function reset_part_1() {
    store.update(s => {
        reset_part_state(s.part_1)
        return s;
    })
}

async function reset_part_2() {
    store.update(s => {
        reset_part_state(s.part_2)
        return s;
    })
}

async function reset_part_3() {
    store.update(s => {
        reset_part_state(s.part_3)
        return s;
    })
}


function reset_part_state( partState: PartState<any>) {
    let current = partState;
    while(current) {
        current.loadStaus = 'idle',
        current.completed = false,
        current.payload.data = {}
        current.payload.error = null
        current = current.child_state
    }
}


export {
    store,
    loadPart_1,
    loadPart_2,
    loadPart_3,
    reset_part_1,
    reset_part_2,
    reset_part_3
}

async function delay(ms = 1000) {
    return new Promise(res => setTimeout(res, ms))
}
 