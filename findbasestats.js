function myFunction(pkmn1) {

    // Declare variables
    var filter, table, tr, td, i, txtValue;
    //input = document.getElementById("myInput");
    // filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    filter = pkmn1.toUpperCase();

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase() == filter) {
              tr[i].style.display = "none";
              let varno    = tr[i].getElementsByTagName("td")[0].childNodes[0].nodeValue;
              let varspe   = tr[i].getElementsByTagName("td")[1].childNodes[0].nodeValue;
              let vartype1 = tr[i].getElementsByTagName("td")[2].childNodes[0].nodeValue;
              try {
                var vartype2 = tr[i].getElementsByTagName("td")[3].childNodes[0].nodeValue;
              }
              catch(err) {
                var vartype2 = 'none';
              }
              let vartotal = tr[i].getElementsByTagName("td")[4].childNodes[0].nodeValue;
              let varhp    = tr[i].getElementsByTagName("td")[5].childNodes[0].nodeValue;
              let varatk   = tr[i].getElementsByTagName("td")[6].childNodes[0].nodeValue;
              let vardef   = tr[i].getElementsByTagName("td")[7].childNodes[0].nodeValue;
              let varspatk = tr[i].getElementsByTagName("td")[8].childNodes[0].nodeValue;
              let varspdef = tr[i].getElementsByTagName("td")[9].childNodes[0].nodeValue;
              let varspeed = tr[i].getElementsByTagName("td")[10].childNodes[0].nodeValue;
              let vargen   = tr[i].getElementsByTagName("td")[11].childNodes[0].nodeValue;
              let varlege  = tr[i].getElementsByTagName("td")[12].childNodes[0].nodeValue;
              var Pokemonbase = {
                  species: varspe,
                  type1: vartype1,
                  type2: vartype2,
                  hpbase: varhp,
                  atkbase: varatk,
                  defbase: vardef,
                  spatkbase: varspatk,
                  spdefbase: varspdef,
                  speedbase: varspeed,
                  legendary: varlege
              }
        }
        else {
          tr[i].style.display = "none";
        }
      }
    }
    
    return Pokemonbase
  }

  
