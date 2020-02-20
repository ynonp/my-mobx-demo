import {action, computed, observable} from "mobx"

export class Item {
    id = Math.random();
    @observable name = "";
    @observable done = false;
}

export class ItemsList {
    @observable todos: Item[] = [];
    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.done).length
    }

    @action
    addItem(name: string) {
        const newItem = new Item();
        newItem.name = name;
        newItem.done = false;
        this.todos.push(newItem);
    }

    @action
    toggleItem(id: number) {
        const idx = this.todos.findIndex(item => item.id === id);
        this.todos[idx].done = !this.todos[idx].done;
    }
}

export default new ItemsList();