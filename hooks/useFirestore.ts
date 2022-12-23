import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import {
    DocumentData,
    WhereFilterOp,
    collection,
    onSnapshot,
    query,
    where,
} from 'firebase/firestore';

interface Condition {
    fieldName: string;
    operator: WhereFilterOp;
    compareValue: string | string[] | [any];
}

export function useFirestore(
    FirestoreCollection: string,
    condition?: Condition,
) {
    const [documents, setDocuments] = useState<DocumentData[]>([]);

    useEffect(() => {
        // This is just a helper to add the type to the db responses

        let collectionRef = collection(db, FirestoreCollection);
        let q;

        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                return;
            }

            q = query(
                collectionRef,
                where(
                    condition.fieldName,
                    condition.operator,
                    condition.compareValue,
                ),
            );
        } else {
            q = collectionRef;
        }

        const unsub = onSnapshot(q, (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setDocuments(data);
        });

        return unsub;
    }, [FirestoreCollection, condition]);

    return documents;
}
