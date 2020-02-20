import React, { useState } from 'react';
import './App.css';

interface IItem {
  id: number;
  name: string;
  done: boolean;
}

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


function Item({ item, toggleItem }: {
    item: IItem,
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
}

function ItemsList({ items, toggleItem }: {
    items: IItem[] ,
    toggleItem: (itemId: number) => void,
}) {
    return (
        <ul>
            {items.map(item => (
                <Item item={item} toggleItem={toggleItem}/>
            ))}
        </ul>
    )
}

function RemainingItems({ items }: { items: IItem [] }) {
    const remaining = items.filter(item => !item.done).length;
    return (
        <p>You have {remaining} items left to do</p>
    )
}

function App() {
    const [items, setItems] = useState<IItem []>([]);

    function addItem(name: string) {
        const newItem = {
            id: items.length,
            name,
            done: false,
        }
        setItems([...items, newItem]);
    }

    function toggleItem(id: number) {
        setItems(items.map(item => (
            item.id === id ? {...item, done: !item.done} : item
        )));
    }

    return (
        <div className="App">
            <NewItemBox addItem={addItem}/>
            <ItemsList items={items} toggleItem={toggleItem} />
            <RemainingItems items={items} />
        </div>
    );
}

export default App;
