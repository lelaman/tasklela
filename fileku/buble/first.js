var inputArr=[];
			var a =0;
			 function TambahData(){
			 	inputArr[a]= parseInt(document.getElementById('word').value);
			 	a++;
			 	document.getElementById("outputhasil").innerHTML =inputArr;

			 }
			 function urutkan(){
			 	bublesort(inputArr)
			 } 
			 bublesort=(inputArr) => {
			 	let len = inputArr.length;
			 	for(let i=0; i<=len;i++){
			 		for(let j=0; j<=len; j++) {
			 			if(inputArr[j]>inputArr[j + 1]) {
			 				let tmp =inputArr[j];
			 				inputArr[j]=inputArr[j+1];
			 				inputArr[j + 1] =tmp;
			 			}
			 		}
			 	}
			 	document.getElementById("outputurut").innerHTML=inputArr;
			 }