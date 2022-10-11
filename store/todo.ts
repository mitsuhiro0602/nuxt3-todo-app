import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'

export interface Todo {
    id: string,
    label: string,
    done: boolean,
    createdAt: Date,
    updatedAt: Date
}

export interface TodoAdd {
    label: string,
}

export interface TodoUpdate {
    label?: string
    done?: boolean
}

export interface TodoState {
    items: Todo[] | undefined[];
}

const state = (): TodoState => ({
    items: []
})

const getters = {
    getById: (state: TodoState) => (id: string) => {
        return state.items.find((item: Todo) => item.id === id)
    },
    getSortedTodos: (state: TodoState) => {
        return [...state.items].sort(
            (a: Todo, b: Todo) => new Date(a.createdAt).getTime() - (b.createdAt).getTime())
    }
};
const actions = {
    add(todo: TodoAdd) {
        const itemTodoAdd: Todo = {
            id: uuid(),
            ...todo,
            done: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        this.items.push(itemTodoAdd);
    },
    remove(id: string) {
        this.items = this.items.filter(item => item.id !== id);
    },
    update(id: string, update: TodoUpdate) {
        this.items = this.items.map(item => item.id === id ? {...item, ...update, updatedAt: new Date()} : item)
    }
};

export const useTodoStore = defineStore('todoStore', {
    state,
    getters,
    actions
});

export interface Todos {
}
