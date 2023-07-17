import { db } from "../firebase/firebaseConfig";
import { collection, query, getDocs,  where, doc, getDoc } from "firebase/firestore";
import products from '../products.json'
import categories from '../categories.json'

// export async function getProducts() {
    // const q = query(collection(db, "products"));
    // const docs = [];
    // const querySnapshot = await getDocs(q);

    // querySnapshot.forEach((doc) => {
    //     docs.push({ ...doc.data(), id: doc.id });
    // });

    // return docs;
    export function getProducts() {
    return products
}

export function getCategories() {
    // const q = query(collection(db, "categories"));
    // const querySnapshot = await getDocs(q);
    // let docs;
    // querySnapshot.forEach((doc) => {
    //     docs = doc.data().categories;
    // });

    // return docs;
    return categories
}

export function getProductsByCategory(category) {
    // const q = query(collection(db, "products"), where("category", "==", category));
    // const docs = [];
    // const querySnapshot = await getDocs(q);
  
    // querySnapshot.forEach((doc) => {
    //   docs.push({ ...doc.data(), id: doc.id });
    // });
  
    // return docs;
    let productsByCategory = []
    products.forEach((product) => {
        if(product.category === category){
            productsByCategory.push(product)
        }})
    return productsByCategory;
}

export function getProductById(productId) {
    // const productRef = doc(db, "products", productId);
    // const docSnapshot = await getDoc(productRef);
  
    // if (docSnapshot.exists()) {
    //   return { ...docSnapshot.data(), id: docSnapshot.id };
    // } else {
    //   return null;
    // }
    const product = products.find((product) => product.id == productId)
    return product
  }