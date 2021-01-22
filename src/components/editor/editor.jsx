import React from 'react';
import CardAddForm from '../card_add_form/card_add_form';
import CardEditform from '../card_edit_form/card_edit_form';
import styles from './editor.module.css';

const Editor = ({FileInput, cards, addCard, updateCard, deleteCard}) => (
            <section className={styles.editor}>
                <h1 className={styles.title}>Card Maker</h1>
               
                {
                    Object.keys(cards).map(key =>(
                        <CardEditform key={key} FileInput={FileInput} card={cards[key]} updateCard={updateCard} deleteCard={deleteCard}/>
                    ))
                }
                
                <CardAddForm onAdd = {addCard} FileInput={FileInput}/>
                
            </section>
    );

export default Editor;<h1>Editor</h1>