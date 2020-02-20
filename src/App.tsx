import React, { useState } from 'react';
import './App.css';
import itemsStore, { Item, ItemsList } from "./mobx/items_store";
import {observable} from "mobx";
import { observer } from "mobx-react"

function NewItemBox({addItem}: { addItem: (_:string) => void}) {
    const [ text, setText ] = useState('');
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        addItem(text);
        setText('');
    }
    return (
        <form onSubmit={handleSubmit}>
          <input
              type={"text"}
              value={text}
              onChange={(e) => setText(e.target.value)}
          />
            <button type={"submit"}>Add</button>
        </form>
    )
}


const ItemView = observer(function ItemView({ item, toggleItem }: {
    item: Item,
    toggleItem: (itemId: number) => void,
}) {
    return (
        <li>
            <label>
                <input
                    type={"checkbox"}
                    checked={item.done}
                    onChange={() => toggleItem(item.id)} />
                {item.name}
            </label>


        </li>
    )
});

const ItemsListView = observer(function ItemsListView({ items, toggleItem }: {
    items: Item[] ,
    toggleItem: (itemId: number) => void,
}) {
    return (
        <ul>
            {items.map(item => (
                <ItemView item={item} toggleItem={toggleItem}/>
            ))}
        </ul>
    )
});

const RemainingItems = observer(function RemainingItems({ items }: { items: ItemsList }) {
    const remaining = items.unfinishedTodoCount;
    return (
        <p>You have {remaining} items left to do</p>
    )
});

function App() {
    const store = itemsStore;

    function addItem(name: string) {
        store.addItem(name);
    }

    function toggleItem(id: number) {
        store.toggleItem(id);
    }

    return (
        <div className="App">
            <NewItemBox addItem={addItem}/>
            <ItemsListView items={store.todos} toggleItem={toggleItem} />
            <RemainingItems items={store} />
        </div>
    );
}

export default App;
