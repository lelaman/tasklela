

  const disconBtn = document.getElementById("btn-discon");

  disconBtn.addEventListener("click", () => {
    const typeDiscon = document.getElementById("type-discon").value;
    const moneyInput = document.getElementById('money-input').value;
    // console.log(typeof typeDiscon);
    // console.log(moneyInput);
  
   
    let potongan = 0;
    let resultDiscon = 0;
  
    let totalBayar = 0;
    let totalharga = 0;
  
    if (typeDiscon === "barang1") {
      let harga = 44500;
      if (moneyInput * harga >= 14) {
        potongan = 0.50 * harga;
        
        resultDiscon = potongan;
        if (resultDiscon ) {
          potongan ;
        }
      }
      totalBayar = (moneyInput * harga) - potongan;
      totalharga = moneyInput * harga;
    }
    else if (typeDiscon === "barang2") {
      let harga = 5330;
      if (moneyInput * harga >=7) {
        potongan = 0.3 * harga ;
        resultDiscon = potongan;
        if (resultDiscon) {
          potongan ;
        }
      }
      totalBayar = (moneyInput * harga )- potongan;
      totalharga = moneyInput * harga;
       
    }

    else if (typeDiscon === "barang3") {
      let harga = 8653;
      if (moneyInput * harga >=7) {
        potongan = 0  ;
        resultDiscon = potongan;
        if (resultDiscon) {
          potongan ;
        }
      }
      totalBayar = (moneyInput * harga )- potongan;
      totalharga = moneyInput * harga;
       
    }
  
    document.getElementById('discon-output').innerHTML = `
      <p>Uang yang harus dibayar: ${totalBayar}</p> 
      <p>Diskon: ${potongan}</p> 
      <p>Total harga barang ${totalharga}</p>
    `;
  })
  
  