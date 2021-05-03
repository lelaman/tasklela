 function gradescale ()
    {
        let grade = document.getElementById('input') .value;
        let result = document.getElementById('output');
        if (grade >= 90 && grade <= 100) 
        {
         result.innerHTML="Nilai konversi adalah A";
       } else if (grade >= 70 && grade <= 89) 
       {
            result.innerHTML="Nilai  konversi adalah B";
        } else if (grade >= 60 && grade <= 69) 
        {
           result.innerHTML="Nilai konversi adalah C";
       } else if (grade >= 40 && grade <= 59) 
       {
           result.innerHTML = "Nilai  konversi adalah D";
        } else if ( grade < 40) 

        {
            result.innerHTML = "Nilai konversi anda adalah E";

         } 
         else 
         {
            window.alert = "invalid grade.please enter a numeric  grade.";
         }
    }