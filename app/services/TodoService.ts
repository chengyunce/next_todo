// TodoService.ts

import { Todo } from "../models/Todo";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
let cachedTodos: Todo[] | null = null; // キャッシュ用の変数

export const getTodos = async () => {
    if (cachedTodos) {
        return cachedTodos; // キャッシュがあればそれを返す
    }

    const url = `${API_URL}/data/todo.json`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const todos = await response.json();
            cachedTodos = todos; // データをキャッシュ
            return todos;
        }
    } catch (error) {
        console.error(error);
    }
}

export const postTodos = async (todos: Todo[]) => {
    if (!todos) return;

    const url = `${API_URL}/data/todo.json`;
    const data = JSON.stringify(todos);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        });

        if (response.ok) {
            console.log('TODOs posted successfully');
            cachedTodos = todos; // データをキャッシュ
        } else {
            console.error('Failed to post TODOs');
        }
    } catch (error) {
        console.error(error);
    }
}