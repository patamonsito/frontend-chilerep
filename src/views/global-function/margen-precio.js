export function MargenPrecio(e) {
    var total = 0;

    // Lineas muy rotadas
    // if(e.Descripcion.toLowerCase().includes('kit embrague') == true ||
    // e.Descripcion.toLowerCase().includes('volante motor') == true ||
    // e.Descripcion.toLowerCase().includes('culata') == true ||
    // e.Descripcion.toLowerCase().includes('turbo') == true ||
    // e.Descripcion.toLowerCase().includes('cremallera') == true ||
    // e.Descripcion.toLowerCase().includes('capot') == true ||
    // e.Descripcion.toLowerCase().includes('cigueñal') == true ||
    // e.Descripcion.toLowerCase().includes('ciguenal') == true ||
    // e.Descripcion.toLowerCase().includes('cigüenal') == true ||
    // e.Descripcion.toLowerCase().includes('cigüeñal') == true ||
    // e.Descripcion.toLowerCase().includes('kit distribucion') == true ||
    // e.Descripcion.toLowerCase().includes('alternador') == true ||
    // e.Descripcion.toLowerCase().includes('motor partida') == true ||
    // e.Descripcion.toLowerCase().includes('amortiguador') == true ||
    // e.Descripcion.toLowerCase().includes('radiador') == true ||
    // e.Descripcion.toLowerCase().includes('condensador') == true
    // ){
      total = Math.round(((e.PrecioImportadora * 40) / 100 + e.PrecioImportadora) * 1.19)
      const exp = /(\d)(?=(\d{3})+(?!\d))/g;
      const rep = '$1.';
      let arr = total.toString().split(',');
      arr[0] = arr[0].replace(exp,rep);
      var resultado = arr[1] ? arr.join(','): arr[0];

      var Comprobar = parseInt(resultado.split('.')[0].slice(-1));

      if(parseInt(Comprobar) < 5){
        resultado = parseInt(resultado.split('.')[0].slice(0, -1) + 4 + '990')
      }else{
        resultado = parseInt(resultado.split('.')[0].slice(0, -1) + 9 + '990')
      }

      if(resultado < 9000){
        return 9990
      }else{
        return resultado;
      }
}