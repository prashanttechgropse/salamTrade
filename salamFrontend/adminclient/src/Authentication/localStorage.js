export const loadState = () =>{
    try{
        const serialiZedState = localStorage.getItem('state');
        if(serialiZedState === null){
            return undefined;
        }
        return JSON.parse(serialiZedState);
    }catch(error){
        return  undefined;
    }
}

export const saveState = (state) =>{
    try{
        const  serialiZedState = JSON.stringify(state);

        localStorage.setItem('state',serialiZedState);
    }catch(error){
        return false;
    }
}