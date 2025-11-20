const newDate = new Date();

const DateNumber : any =  parseInt(newDate.getFullYear() as any);

const nameDate1 =  (DateNumber+1)+"-"+(DateNumber+2) ;
const nameDate2 =  (DateNumber+2)+"-"+(DateNumber+3) ;
const nameDateNew =  DateNumber+"-"+ (DateNumber+1) ;
const nameDate_1 =  (DateNumber-1) +"-"+DateNumber;
const nameDate_2 =  (DateNumber-2) +"-"+(DateNumber-1) ;

export const AnneeScolaireDataYears = [nameDate_2,nameDate_1,nameDateNew,nameDate1,nameDate2]