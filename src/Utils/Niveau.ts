export let dataClasse =  [
    // Creche
   { nom  : "Maternelle" },

    // Primaire
   { nom  : "12em"},
   { nom  : "11em"},
   { nom  : "10em"},
   { nom  : "9em"},
   { nom  : "8em"},
   { nom  : "7em"},

   // Colege
   { nom  : "6em"},
   { nom  : "5em"},
   { nom  : "4em"},
   {  nom  : "3em"},

   // Lycée
   {  nom  : "2nd"},
   {  nom  : "1er"},
   {  nom  : "Terminal"},

   // Universite
   {  nom  : "L1"},
   {  nom  : "L2"},
   {  nom  : "L3"},
   {  nom  : "M1"},
   {  nom  : "M2"},
]

export const HandleNiveaux = (Niveaux : any ,setNewArray : any ) => {
    if(Niveaux) {
        if(Niveaux.nom === "Primaire") {
            const newArrayExample : any = []; 
            dataClasse.filter( (  items : any) => {
                
                return (items.nom === "12em") || 
                (items.nom === "11em") || 
                (items.nom === "10em") || 
                (items.nom === "9em") || 
                (items.nom === "8em") || 
                (items.nom === "7em")
            }).map( item =>  newArrayExample.push(item)  ); 
            setNewArray(newArrayExample)          
        }else if (Niveaux.nom === "Crèche") {
            const newArrayExample : any = []; 
            dataClasse.filter( (  items : any) => {
                
                return (items.nom === "Maternelle") 
            }).map( item =>  newArrayExample.push(item)  ); 
            setNewArray(newArrayExample) 
        }else if (Niveaux.nom === "Lycée") {
            const newArrayExample : any = []; 
            dataClasse.filter( (  items : any) => {
                
                return (items.nom === "2nd") || 
                (items.nom === "1er") || 
                (items.nom === "Terminal") 
            }).map( item =>  newArrayExample.push(item)  ); 
            setNewArray(newArrayExample) 
        }else if (Niveaux.nom === "Collége") {
            const newArrayExample : any = []; 
            dataClasse.filter( (  items : any) => {
                
                return (items.nom === "6em") || 
                (items.nom === "5em") || 
                (items.nom === "4em") || 
                (items.nom === "3em") 
            }).map( item =>  newArrayExample.push(item)  ); 
            setNewArray(newArrayExample) 
        }else if (Niveaux.nom === "Université") {
            const newArrayExample : any = []; 
            dataClasse.filter( (  items : any) => {
                
                return (items.nom === "L1") || 
                (items.nom === "L2") || 
                (items.nom === "L3") || 
                (items.nom === "M1") ||
                (items.nom === "M2") 
            }).map( item =>  newArrayExample.push(item)  ); 
            setNewArray(newArrayExample) 
        }
    }
}
