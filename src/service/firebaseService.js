import { db } from "../firebase/firebaseConfig";
import { collection, query, getDocs, where, doc, getDoc, addDoc, setDoc } from "firebase/firestore";


export async function getProducts() {
    const q = query(collection(db, "products"));
    const docs = [];
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
    });

    return docs;
}

export async function getCategories() {
    const q = query(collection(db, "categories"));
    const querySnapshot = await getDocs(q);
    let docs;
    querySnapshot.forEach((doc) => {
        docs = doc.data().categories;
    });

    return docs;
}

export async function getProductsByCategory(category) {
    const q = query(collection(db, "products"), where("category", "==", category));
    const docs = [];
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
    });

    return docs;
}

export async function getProductById(productId) {
    const productRef = doc(db, "products", productId);
    const docSnapshot = await getDoc(productRef);

    if (docSnapshot.exists()) {
        return { ...docSnapshot.data(), id: docSnapshot.id };
    } else {
        return null;
    }

}


export async function addPurchase(purchaseData) {
    try {
        const purchaseRef = collection(db, "purchases");
        const docRef = await addDoc(purchaseRef, purchaseData);

        const purchasedProducts = purchaseData.products;
        for (const purchasedProduct of purchasedProducts) {
            const productId = purchasedProduct.id;
            const newProduct = {
                category: purchasedProduct.category,
                description: purchasedProduct.description,
                image: purchasedProduct.image,
                price: purchasedProduct.price,
                stock: purchasedProduct.stock - purchasedProduct.count,
                title: purchasedProduct.title
            }

            await setDoc(doc(db, "products", productId), newProduct)
        }

        return docRef.id;
    } catch (error) {
        return null;
    }
}