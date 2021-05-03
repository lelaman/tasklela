 function umurkita ()
    {
        const num = document.getElementById('input') .value;
        const result = document.getElementById('output');
        if ( num >60 && num <= 100) 
        {
         result.innerHTML= ( " umur " +num+ "  tahun adalah lanjut usia");
       } else if (num> 20 && num <=60) 
       {
            result.innerHTML= ( " umur  " +num+  " tahun  adalah dewasa");
        } else if (num >11 && num <=19 ) 
        {
           result.innerHTML= ( " umur " +num+  "  tahun adalah  remaja");
       } else if (num  > 2 && num<= 10) 
       {
           result.innerHTML =  (" umur  "  +num+  "  tahun adalah anak anak");
        } else if ( num  < 1) 

        {
            result.innerHTML = ( " umur  "  +num+  "  tahun adalah bayi");

         } 
         else 
         {
            window.alert = "invalid grade.please enter a numeric  grade.";
         }
    }