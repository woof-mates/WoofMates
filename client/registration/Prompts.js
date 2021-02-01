import React from 'react';

export default function Prompts(props){
    const { dogSpeak, favoriteActivityWithDog, onChange } = props
    return (
        <div id="prompts">
            <div className="prompt">
            If your dog could speak it would say...<br />
            <textarea name="dogSpeak" className="prompt-text" rows="3" cols="50" wrap="hard" placeholder="" onChange={onChange} value={dogSpeak || ''} />
            </div>
            <div className="prompt">
            Your favorite thing to do with your pup is...<br />
            <textarea name="favoriteActivityWithDog" className="prompt-text" rows="3" cols="50" wrap="hard" placeholder="" onChange={onChange} value={favoriteActivityWithDog || ''} />
            </div>
        </div>
    )
}
