import { setActivePinia, createPinia } from 'pinia'
import { describe, test, expect, beforeAll, beforeEach, afterEach } from 'vitest';
import { useTodoStore } from "./todo";

// describe('runs', () => {
//     test('it works', () => {
//         expect(true).toBe(true);
//     });
// });

const getFirstTodoId = (store: ReturnType<typeof useTodoStore>) => {
    return store.items[0].id
}

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
        store.add({ label: 'Test my code!'});
        expect(store.items[0]).toBeDefined();
        expect(store.items[0].label).toBe('Test my code!')
    })

    test("has empty todos on init", () => {
        expect(store.items).toStrictEqual([]);
    });

    // test("adds a todo", () => {
    //     store.add({
    //         label: "Clean Home"
    //     });
    //     expect(store.items).toStrictEqual([
    //         {
    //             id: expect.any(String),
    //             label: "Clean Home",
    //             done: false,
    //             createdAt: expect.any(Date),
    //             updatedAt: expect.any(Date)
    //         }
    //     ]);
    // });

    test("gets by id", () => {
        store.add({ label: 'Test'});
        const item = store.items[0];
        const todo = store.getById(item.id)
        expect(todo).toStrictEqual(item)
    })

    test("gets todo by id", () => {
        store.add({
            // @ts-ignore
            label: "Clean Home",
        });
        const id = getFirstTodoId(store);
        const item = store.getById(id);
        // @ts-ignore
        expect(item.label).toBe("Clean Home")
    });

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

        const orderedTodos = store.getSortedTodos

        expect(orderedTodos[0].createdAt.getFullYear()).toBe(2019);
        expect(orderedTodos[1].createdAt.getFullYear()).toBe(2020);
        expect(orderedTodos[2].createdAt.getFullYear()).toBe(2021);
        expect(store.items[0].createdAt.getFullYear()).toBe(2021)
    });

    test("deletes a todo", () => {
        // @ts-ignore
        store.add({ label: "Delete Me"});
        const id = getFirstTodoId(store);
        store.remove(id);
        expect(store.items).toStrictEqual([]);
    })

    test('remove a todo', () => {
        store.add({ label: "test" });
        const todo = store.items[0]
        store.remove(todo.id);
        expect(store.items).toStrictEqual([]);
    })

    test('updates a todo', () => {
        store.add({ label: 'test' });
        const todo = store.items[0];
        store.update(todo.id, { label: 'tested' });
        const updated = store.items[0]
        expect(updated.label).toBe('tested')
    })
});
