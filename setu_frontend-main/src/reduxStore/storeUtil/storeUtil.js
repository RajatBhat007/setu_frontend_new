
export function saveToLocalStorage(state){
    try{
       
        const serializedState = JSON.stringify(state);
        console.log("store",state)
        sessionStorage.setItem('session', serializedState)
 
    }catch(e){
        console.log(e);
    }
 }
 
 export function loadFromLocalStorage(state){
     try{
    
         const serializedState = sessionStorage.getItem('session')
         if (serializedState === null) return undefined;
         return JSON.parse(serializedState);
       
     }catch(e){
         console.log(e);
         return undefined
     }
  }
 