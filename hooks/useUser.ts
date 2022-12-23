import { useEffect, useState } from 'react';
import { usersCol } from '../firebase/config';
import { onSnapshot, query, where } from 'firebase/firestore';
import { User } from '../typings';
import { useAppSelector } from './hooks';
import { userSelector } from '../redux/selector';

export function useUser() {
    const [user, setUser] = useState<User | null>(null);
    const { userUid } = useAppSelector(userSelector);

    useEffect(() => {
        // This is just a helper to add the type to the db responses

        const q = query(usersCol, where('uid', '==', userUid));
        const unsub = onSnapshot(q, (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setUser(data[0]);
        });

        return unsub;
    }, [userUid]);

    return user;
}
