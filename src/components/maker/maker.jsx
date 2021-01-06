import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';


const Maker = ({FileInput, authService, cardRepository}) => {
    const historyState = useHistory().state;
    const [userId, setUserId] = useState(historyState && historyState.id);
    
    //Object의 특징을 잘 이용해보자
    const [cards, setCards] = useState({});

    const history = useHistory();
    const onLogout = useCallback(() =>{
        authService.logout();
    },[authService]);

    useEffect(()=>{
        if(!userId)
        {
            return;
        }
        const stopSync = cardRepository.syncCards(userId, cards =>{
            setCards(cards);
        })
        return () => stopSync();

    }, [userId,cardRepository]);

    useEffect(() =>{
        authService.onAuthChange(user =>{
            if(user){
                setUserId(user.uid);
            }
            else
            {
                history.push('/');
            }
        })
    },[authService, userId, history]);


    const createOrupdateCard = card =>{
        //Object의 특징을 잘 이용해보자
        /* 기존방식
        const updated = {...cards};
        updated[card.id] = card;
        setCards(updated);
        */

        /**setCards를 콜백함수처럼 이용하는 방법도 있음**/
        setCards(cards =>{
            const updated = {...cards};
            updated[card.id] = card;
            return updated
        });

        cardRepository.saveCard(userId, card);

    }

    const deleteCard = card =>{
        setCards(cards =>{
            const updated = {...cards};
            delete updated[card.id];
            return updated
        });
        cardRepository.removeCard(userId, card);
    }

    return(
        <section className={styles.maker}>
            <Header onLogout={onLogout} />
            <div className={styles.container}>
                <Editor className={styles.editor} FileInput={FileInput} cards={cards} addCard={createOrupdateCard} updateCard={createOrupdateCard} deleteCard={deleteCard} />
                <Preview className={styles.preview} cards={cards}  />
            </div>
            <Footer />
        </section>
    )
};

export default Maker;