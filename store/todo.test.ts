import { setActivePinia, createPinia } from 'pinia'
import { describe, test, expect, beforeAll, beforeEach, afterEach } from 'vitest';
import { useTodoStore } from "./todo";

// describe('runs', () => {
//     test('it works', () => {
//         expect(true).toBe(true);
//     });
// });

beforeAll(() => {
    setActivePinia(createPinia());
});

describe('useTodoStore', () => {
    let store: ReturnType<typeof useTodoStore>
    beforeEach(() => {
        store = useTodoStore();
    });
    afterEach(() => {
        store.$reset();
    });
    test('creates a store', () => {
        expect(store).toBeDefined()
    });

    test("initialize with empty items", () => {
        expect(store.items).toStrictEqual([]);
    })

    test("creates a todo", () => {
        store.add({ title: 'Test my code!'});
        expect(store.items[0]).toBeDefined();
        expect(store.items[0].title).toBe('Test my code!')
    })

    test("gets by id", () => {
        store.add({ title: 'Test'});
        const item = store.items[0];
        const todo = store.getById(item.id)
        expect(todo).toStrictEqual(item)
    })

    test("gets ordered todos without mutating state", () => {
        const items = [
            {
                createdAt: new Date(2021, 2, 14),
            },
            {
                createdAt: new Date(2019, 2, 14),
            },
            {
                createdAt: new Date(2020, 6, 14),
            }
        ]
        // @ts-ignore
        store.items = items;

        const orderedTodos = store.getOrderedTodos

        expect(orderedTodos[0].createdAt.getFullYear()).toBe(2019);
        expect(orderedTodos[1].createdAt.getFullYear()).toBe(2020);
        expect(orderedTodos[2].createdAt.getFullYear()).toBe(2021);
        expect(store.items[0].createdAt.getFullYear()).toBe(2021)
    });

    test('remove a todo', () => {
        store.add({ title: "test" });
        const todo = store.items[0]
        store.remove(todo.id);
        expect(store.items).toStrictEqual([]);
    })

    test('updates a todo', () => {
        store.add({ title: 'test' });
        const todo = store.items[0];
        store.update(todo.id, { title: 'tested' });
        const updated = store.items[0]
        expect(updated.title).toBe('tested')
    })
});
