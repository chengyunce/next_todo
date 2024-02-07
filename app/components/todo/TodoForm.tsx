// "use client"

import { useState } from "react";
import ClickButton from "@/app/components/ClickButton";
import Input from "@/app/components/Input";
import TagsInput from "@/app/components/tag/TagsInput";

interface TodoFormProps {
    onSaveTodo: (value: string, tags: string[]) => void;
    autoCompleteTags: string[];
}

const TodoForm = ({
    onSaveTodo,
    autoCompleteTags = []
}: TodoFormProps) => {
    const [inputValue, setInputValue] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    const addClickHandler = () => {
        onSaveTodo(inputValue, tags);
        setInputValue("");
        setTags([]);
    }

    return (
        <div>
            <Input
                value={inputValue}
                onChange={setInputValue}
                placeholder="Todoを入力してください..." />

            <TagsInput
                tags={tags}
                setTags={setTags}
                autoCompleteTags={autoCompleteTags}
                placeholder="タグを入力してください..." />

            <ClickButton
                label="追加"
                onClick={addClickHandler}
                disabled={!inputValue} />
        </div>
    );
}

export default TodoForm;