function convertSuhu(){
     let c,f, k,hasil,pil;
     x=document.temperatur.temp.value;
     Number(x);
     for (let i=0;i<document.temperatur.pilihan.length;i++){
           if(document.temperatur.pilihan[i].checked==true){
                tempType=document.temperatur.pilihan[i].value;
                break;
           }
          
     }
     if(tempType=='fahrenheit'){
           hasil=9/5*x+32 ;
     } else if (tempType=='celcius'){
           hasil=(x-32)*5/9 ;

      } else if (tempType=='kelvin') {
         hasil= x+273 ;
         } else {
         hasil=(4/5)*x;
      }
     document.temperatur.resultfield.value= hasil ;
}