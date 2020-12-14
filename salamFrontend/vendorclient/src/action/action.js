function authenticate(resp){
    return dispatch =>{
        // console.log('rrrrrrrrrrrrrrrrrrrrr',resp.payload);
        dispatch({
            type: 'authenticate',
            image       : resp.payload.image,
            name        : resp.payload.name,
            email       : resp.payload.email,
            Type        : resp.payload.accountType,
            userId      : resp.payload.id,
            mobile      : resp.payload.mobile,
            storeName   : resp.payload.storeName,
            storeEmail  : resp.payload.storeEmail,
            storeMobile : resp.payload.storeMobile,
            streetName  : resp.payload.streetName,
            address     : resp.payload.address,
            lat         : resp.payload.lat,
            lng         : resp.payload.lng,
            city        : resp.payload.city,
            zipCode     : resp.payload.zipCode,
            // productId   : resp.payload.productId,
        })
    }
}

function product(res){
    return dispatch =>{
        console.log(';;;;;;;;;;;;;;;;;;;;',res.payload);
        dispatch({
            type: 'product',
            name : res.payload.name,
            productId : res.payload.productId,
            file1 : res.payload.file1,
            file2 : res.payload.file2,
            file3 : res.payload.file3,
            file4 : res.payload.file4,
            productName: res.payload.productName,
            productPrice : res.payload.productPrice,
            discount :  res.payload.discount,
            businesscategory :res.payload.businesscategory, 
            category: res.payload.category,
            subCategory: res.payload.subCategory,
            brandName: res.payload.brandName,
            quantity: res.payload.quantity,
            aboutProduct : res.payload.aboutProduct,
            storeName : res.payload.storeName,
        })
    }
}

function editproduct(res){
    return dispatch =>{
        // console.log(';;;;;;;;;;;;;;;;;;;;',res.payload);
        dispatch({
            type: 'editproduct',
            productId : res.payload.productId,
            file : res.payload.file,
            productName: res.payload.productName,
            productPrice : res.payload.productPrice,
            discount :  res.payload.discount,
            businesscategory :res.payload.businesscategory, 
            category: res.payload.category,
            subCategory: res.payload.subCategory,
            brandName: res.payload.brandName,
            quantity: res.payload.quantity,
            aboutProduct : res.payload.aboutProduct,
        })
    }
}

export default {
    authenticate,
    product,
    editproduct
}