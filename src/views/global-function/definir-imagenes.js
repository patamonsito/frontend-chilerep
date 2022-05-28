export function DefinirImagenes(Importadora, CodigoImportadora, OEM, Default ) {

  // console.log(Importadora, CodigoImportadora, OEM, Default)

    if (Importadora == "Refax") {
        return "https://img.refaxchile.cl:9092/FOTOGRAFIAS/" + CodigoImportadora + "/" + CodigoImportadora + "A.jpg";
      }
      if (Importadora == "Mannheim") {
        return "http://200.73.35.244:8080/webclient/images/" + OEM + ".jpg";
      }
      if (Importadora == "Alsacia") {
          return Default
      }
      if (Importadora == "Bicimoto") {
        return Default
      }

}