export const generateRandomString=()=>{
    const charcaters = 'ABDJFEWFHFWEF12323123adwfweofof';
    var result = '';
    for(let i = 0;i<6;i++){
        result = result + charcaters.charAt(Math.floor(Math.random()*charcaters.length));
    }
    return result;
}