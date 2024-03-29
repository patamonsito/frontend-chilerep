
import axios from 'axios';
// axios.defaults.withCredentials = true;

console.log(process.env.NODE_ENV)

const url = process.env.NODE_ENV == 'development' ? 'http://localhost:3000/api' : 'http://137.184.198.84:3000/api'

console.log(url)

export default class API {
    //Login Admin
    static async USER_LOGIN_ADMIN(Usuario, Correo, Contraseña, ip){
        const res = await axios.post(url+ '/user-login_admin', {
            Usuario,
            Correo,
            Contraseña,
            ip
        });
        localStorage.setItem("Token", res.data.Token)
        return res.data;
    }


    static async GET_PRODUCTS_GABTEC_BY_SKU(CodigoImportadora){
        const res = await axios.post(url+ '/products-gabtec-by-sku', { CodigoImportadora });
        return res.data;
    }

    static async POST_GABTEC_MARKETPLACE(isPublicated, id){
        const res = await axios.post(url+ '/gabtec-marketplace-publicated', { isPublicated, id });
        return res.data;
    }

    static async POST_PRODUCTS_GABTEC(Categoria){
        const res = await axios.post(url+ '/product-gabtec', {Categoria: Categoria});
        return res.data;
    }


    static async POST_PRODUCTS_BY_SKU(Sku){
        const res = await axios.post(url+ '/post-product-by-sku', {Sku});
        return res.data;
    }

    static async POST_PRODUCTS_BY_SKU(Sku){
        const res = await axios.post(url+ '/post-product-by-sku', {Sku});
        return res.data;
    }

    static async GET_USER_TOKEN_ADMIN(ip){
        const res = await axios.post(url+ '/user_token_admin', { ip, Token: localStorage.Token  });
        return res.data;
    }

    //Session
    static async DELETE_SESSION(){
        const res = await axios.delete(url+ '/delete-session');
        return res.data;
    }

    //Usuarios CRUD
    static async GET_USERS(){
        const res = await axios.get(url+'/users');
        return res.data;
    }
    static async GET_USER_BY_ID(id){
        const res = await axios.get(url+ '/user/' +id);
        return res.data;
    }
    static async CREATE_USER(){
        const res = await axios.post(url+ '/user');
        return res.data;
    }
    static async USER_LOGIN(Correo, Contraseña, ip){
        const res = await axios.post(url+ '/user-login', {
            Correo: Correo,
            Contraseña: Contraseña,
            ip: ip
        });
        return res.data;
    }
    static async GET_LOGOUT(id){
        const res = await axios.get(url+ '/logout', {Token: localStorage.Token });
        localStorage.User = null;
        localStorage.Token = null;
        return res.data;
    }

    static async UPDATE_USER(id){
        const res = await axios.patch(url+ '/user/' + id);
        return res.data;
    }
    static async DELETE_USER(id){
        const res = await axios.delete(url+ '/user/' + id);
        return res.data;
    }
    static async BLOCK_USER(id){
        const res = await axios.lock(url+ '/user/' + id);
        return res.data;
    }
    static async UNBLOCK_USER(id){
        const res = await axios.unlock(url+ '/user/' + id);
        return res.data;
    }
    
    static async GET_USER_TOKEN(){
        const res = await axios.post(url+ '/user_token');
        return res.data;
    }
    //PRODUCTOS CRUD

    static async POST_PRODUCTS_CODE(Code){
        const res = await axios.post(url+ '/products-code', { Code });;
        return res.data;
    }


    static async POST_PRODUCT_SEARCH(CodigoModelo, Descripcion){
        const res = await axios.post(url+ '/products', { CodigoModelo, Descripcion});;
        return res.data;
    }

    static async POST_LINEA_SEARCH(MarcaVehiculo, Descripcion){
        const res = await axios.post(url+ '/products-linea', { MarcaVehiculo, Descripcion});;
        return res.data;
    }

    static async GET_PRODUCT_BY_ID(Id){
        const res = await axios.get(url+ '/product/' + Id);;
        return res.data;
    }

    
    static async GET_PRODUCTS_OFF(page){
        const res = await axios.get(url+ '/product-off/' + page);
        return res.data;
    }
  
    static async PRODUCT_CHANGE_DESCRIPCTION(Importadora, CodigoImportadora, OEM, Descripcion) {
        console.log('here')
        const res = await axios.post(url+ '/products-description', { Importadora, CodigoImportadora, OEM, Descripcion });;
        return res.data;
    }

    static async CATALOGO_EXCEL(Json, Name) {
        const res = await axios.post(url+ '/catalogo-to-excel', { Json, Name }, {responseType: 'blob'});;
        download(res.data, Name + '.xlsx');
    }

    static async GET_PRODUCTS_BY_MODELOID(CodigoModelo, Page){
        const res = await axios.get(url+ '/products/' + CodigoModelo + '/' + Page);
        return res.data;
    }

        static async POST_CREATEPRODUCTS(Datos, urlRefax = '', urlAlsacia = '', urlBicimoto = ''){
            const res = await axios.post(url+ '/products/create-many', { Datos, urlRefax, urlAlsacia, urlBicimoto });
            return res.data;
        }

    //MARCAS CRUD
    static async GET_MARCAS(){
        const res = await axios.get(url+ '/marcas-erp-ulti-spa');
        return res.data;
    }
    //MODELOS CRUD
    static async GET_MODELS(){
        const res = await axios.get(url+ '/models');
        return res.data;
    }

    static async GET_MODELSBYMARCA(id){
        const res = await axios.post(url+ '/models', { id } );
        return res.data;
    }


    static async POST_COUNT_PRODUCT_BY_MODELS(CodigoModelo){
        const res = await axios.post(url+ '/count-products-by-models', { CodigoModelo });
        return res.data;
    }

    static async GET_MODEL(id){
        const res = await axios.get(url+ '/model/' + id);
        return res.data;
    }

    static async POST_MODELS_SEARCH(key){
        const res = await axios.post(url+ '/models_search', { key });
        return res.data;
    }
    //FAMILIAS CRUD
    static async GET_FAMILIES(){
        const res = await axios.get(url+ '/families');
        return res.data;
    }
    //MENU CRUD
    static async GET_MENU(id){
        const res = await axios.get(url+ '/menu_auth/'+id);
        return res.data;
    }
    //SLIDERS CRUD
    static async GET_SLIDERS(){
        const res = await axios.get(url+ '/sliders');
        return res.data;
    }

    //LINEAS CRUD
    static async GET_LINEAS(){
        const res = await axios.get(url+ '/lineas');
        return res.data;
    }

    //carro
    static async ADD_TO_CART(CodigoImportadora, Cantidad, Modelo){
        const res = await axios.post(url+ '/add-cart', { CodigoImportadora, Cantidad, Modelo, Token: localStorage.Token });
        return res.data;
    }
    
    static async REMOVE_TO_CART(CodigoImportadora, Cantidad){
        const res = await axios.post(url+ '/remove-cart', { CodigoImportadora, Cantidad, Token: localStorage.Token });
        return res.data;
    }


    static async UPDATE_CART(CodigoImportadora, Cantidad){
        const res = await axios.post(url+ '/update-carrito', { CodigoImportadora, Cantidad, Token: localStorage.Token });
        return res.data;
    }

    static async GET_CERRITO_SESSION(){
        const res = await axios.post(url+ '/get-carrito', { Token: localStorage.Token });
        return res.data;
    }


    static async POST_EMITIR_DOCUMENTO(Documento){

        if(Documento.TipoDocumento == 'Cotización'){
            const res = await axios.post(url+ '/emitir-documento', { Documento }, {responseType: 'blob'});
                return download(res.data, 'Cotizacion_' + Documento.Nombres.replaceAll(' ', '_') +  Documento.Apellidos.replaceAll(' ', '_') + '.pdf');
        }else{
            const res = await axios.post(url+ '/emitir-documento', { Documento });
            return res.data;
        }

    }

    static async POST_APLICACIONESR(CodigoImportadora){
        const res = await axios.post(url+ '/aplicaciones-r', { CodigoImportadora });
        return res.data;
    }

    static async GET_CLIENT(Rut){
        const res = await axios.get(url+ '/get-client/' + Rut);
        return res.data;
    }
    static async GET_REGIONES(){
        const res = await axios.get(url+ '/get-regiones');
        return res.data;
    }

    static async POST_COMUNA(Region){
        const res = await axios.post(url+ '/post-comuna', { Region });
        return res.data;
    }

    //ordenes
    static async POST_GENERAR_ORDEN_COMPRA(Json){
        const res = await axios.post(url+ '/generar-orden', { Json } );
        return res.data;
    }

    static async POST_ORDEN(Token){
        const res = await axios.post(url+ '/orden', { Token } );
        return res.data;
    }

    //Libro Compra
    static async GET_DOCUMENTOS(){
        const res = await axios.get(url+ '/obtener-documentos');
        return res.data;
    }

    static async POST_DOCUMENTO(Documento){
        const res = await axios.post(url+ '/obtener-documento', { Documento } );
        return res.data;
    }


    static async POST_DOCUMENTOS(dateFilter){
        const res = await axios.post(url+ '/obtener-documentos', { dateFilter } );
        return res.data;
    }
    

    //API IMPORTADORA

    static async POST_ALSACIA_CODE(codeAlsacia){
        const res = await axios.post(url+ '/save-alsacia-code', { codeAlsacia } );
        return res.data;
    }

    static async POST_API_IMPORTADORA(Buscar){
        const res = await axios.post(url+ '/products/api-importadora', { Buscar } );
        return res.data;
    }

    
    static async POST_API_CHILEREPUESTOS(Buscar){
        const res = await axios.post(url+ '/api-chilerepuestos', { Buscar } );
        return res.data;
    }

    static async POST_API_REFAX(Buscar){
        const res = await axios.post(url+ '/api-refax', { Buscar } );
        return res.data;
    }
    
    static async POST_API_BICIMOTO(Buscar){
        const res = await axios.post(url+ '/api-bicimoto', { Buscar } );
        return res.data;
    }
    static async POST_API_MANNHEIM(Buscar){
        const res = await axios.post(url+ '/api-mannheim', { Buscar } );
        return res.data;
    }
    static async POST_API_ALSACIA(Buscar){
        const res = await axios.post(url+ '/api-alsacia', { Buscar } );
        return res.data;
    }

    static async POST_PAGEALSACIA(Page){
        const res = await axios.post(url+ '/alsacia-page', { Page } );
        return res.data;
    }
    
    static async POST_API_NORIEGA(Buscar){
        const res = await axios.post(url+ '/api-noriega', { Buscar } );
        return res.data;
    }
  
    static async POST_API_CUATRORUEDAS(Buscar){
        const res = await axios.post(url+ '/api-cuatro-ruedas', { Buscar });
        return res.data;

    }

    static async POST_API_GABTEC(Buscar){
        const res = await axios.post(url+ '/api-gabtec', { Buscar });
        return res.data;
    }

    static async POST_API_SASVAL(Buscar){
        const res = await axios.post(url+ '/api-sasval', { Buscar });
        return res.data;
    }

    static async POST_API_AUTOMARCOS(Buscar){
        const res = await axios.post(url+ '/api-automarcos', { Buscar });
        return res.data;
    }

    static async POST_CONSULTARAUTOMARCOS(Codigo){
        const res = await axios.post(url+ '/consultar-automarcos', { Codigo });
        return res.data;
    }

    static async POST_CONSULTARGABTEC(Codigo){
        const res = await axios.post(url+ '/consultar-gabtec', { Codigo });
        return res.data;
    }
    

    static async POST_CONSULTARSASVAL(Codigo){
        const res = await axios.post(url+ '/consultar-sasval', { Codigo });
        return res.data;
    }
    

    static async POST_CONSULTARBODEGASASVAL(Codigo){
        const res = await axios.post(url+ '/consultar-bodega-sasval', { Codigo });
        return res.data;
    }
    
    static async POST_CONSULTARALSACIA(Codigo){
        const res = await axios.post(url+ '/consultar-alsacia', { Codigo });
        return res.data;
    }


    //API IMPORTADORA



    static async POST_AUTOMARCO_AUTH(){
        const res = await axios.post(url+ '/auth-automarco');
        return res.data;
    }


    static async POST_REFAX_AUTH(){
        const res = await axios.post(url+ '/auth-refax');
        return res.data;
    }


    static async POST_COOKIE_ALSACIA(){
        const res = await axios.post(url+ '/cookie-alsacia');
        return res.data;
    }


    static async POST_LOGIN_ALSACIA(){
        const res = await axios.post(url+ '/auth-alsacia');
        return res.data;
    }


    static async POST_BICIMOTO_AUTH(){
        const res = await axios.post(url+ '/auth-bicimoto');
        return res.data;
    }

    static async POST_NORIEGA_AUTH(){
        const res = await axios.post(url+ '/auth-noriega');
        return res.data;
    }

    static async POST_SASVAL_AUTH(){
        const res = await axios.post(url+ '/auth-sasval');
        return res.data;
    }

    static async POST_APLICACIONESM(Aplicacion){
        const res = await axios.post(url+ '/aplicaciones-m', { Aplicacion } );
        return res.data;
    }

    //NOTA DE CREDITO
    static async POST_NOTACREDITO(Documento){
        const res = await axios.post(url+ '/realizar-nota-credito', { Documento } );
        return res.data;
    }

    //PROVEEDORES
    static async GET_PROVEEDORES(){
        const res = await axios.get(url+ '/get-proveedores');
        return res.data;
    }
    static async GET_PROVEEDOR(Id){
        const res = await axios.get(url+ '/get-proveedor/' + Id );
        return res.data;
    }

    static async CREAR_PROVEEDOR(Json){
        const res = await axios.post(url+ '/crear-proveedor', Json );
        return res.data;
    }

    static async UPDATE_PROVEEDOR(Json){
        const res = await axios.post(url+ '/update-proveedor', Json );
        return res.data;
    }

    static async ELIMINAR_PROVEEDOR(rut){
        const res = await axios.delete(url+ '/delete-proveedor/' + rut );
        return res.data;
    }


    //BODEGAS
    static async GET_BODEGAS(){
        const res = await axios.get(url+ '/get-bodegas');
        return res.data;
    }
    static async GET_BODEGA(Id){
        const res = await axios.get(url+ '/get-bodega/' + Id );
        return res.data;
    }
    
    static async CREAR_BODEGA(Json){
        const res = await axios.post(url+ '/crear-bodega', Json );
        return res.data;
    }

    static async UPDATE_BODEGA(Json){
        const res = await axios.post(url+ '/update-bodega', Json );
        return res.data;
    }

    static async ELIMINAR_BODEGA(Bodega){
        const res = await axios.delete(url+ '/delete-bodega/' + Bodega );
        return res.data;
    }


    //WMS REGISTROS
    static async GET_REGISTROS(){
        const res = await axios.get(url+ '/get-registros');
        return res.data;
    }
    
    static async GET_REGISTRO(Id){
        const res = await axios.get(url+ '/get-registro/' + Id );
        return res.data;
    }
    
    static async CREAR_REGISTRO(Json){
        const res = await axios.post(url+ '/crear-registro', Json );
        return res.data;
    }

    static async CREAR_REGISTRO_VENTA(Json){
        const res = await axios.post(url+ '/crear-registro-venta', { Json });
        return res.data;
    }


    static async UPDATE_REGISTRO(Json){
        const res = await axios.post(url+ '/update-registro', Json );
        return res.data;
    }

    static async ELIMINAR_REGISTRO(id){
        const res = await axios.delete(url+ '/delete-registro/' + id );
        return res.data;
    }

    //SUCURSALES
    static async GET_SUCURSALES(){
        const res = await axios.get(url+ '/get-sucursales');
        return res.data;
    }
    static async GET_SUCURSAL(Id){
        const res = await axios.get(url+ '/get-sucursal/' + Id );
        return res.data;
    }
    
    static async CREAR_SUCURSAL(Json){
        const res = await axios.post(url+ '/crear-sucursal', Json );
        return res.data;
    }

    static async UPDATE_SUCURSAL(Json){
        const res = await axios.post(url+ '/update-sucursal', Json );
        return res.data;
    }

    static async ELIMINAR_SUCURSAL(id){
        const res = await axios.delete(url+ '/delete-sucursal/' + id );
        return res.data;
    }



    //WebpayPlus POST_WEBPAY

    static async POST_WEBPAY(){
        const res = await axios.post(url+ '/start-webpay', { Token: localStorage.Token } );
        return res.data;
    }

    static async POST_RETRY_WEBPAY(Json){
        const res = await axios.post(url+ '/restart-webpay', { Json } );
        return res.data;
    }

    //VALIDAR RUT

    static async POST_RUTEMPRESA(Rut){
        const res = await axios.post(url+ '/validar-rut', { Rut });
        return res.data;
    }

    static async PRODUCT_MARKETPLACE(Importadora, CodigoImportadora, OEM, Marketplace){
        const res = await axios.post(url+ '/product-marketplace', { Importadora, CodigoImportadora, OEM, Marketplace });
        return res.data;
    }
    
    //POST CREATE LINK

    static async POST_CREATELINK(Importadora, CodigoModelo, Url){
        const res = await axios.post(url+ '/create-link', { Importadora, CodigoModelo, Url });
        return res.data;
    }


    static async IMG_CONTROLLER(CodigoImportadora, OEM, Importadora, Accion, Img){
        const res = await axios.post(url+ '/img-controller', { CodigoImportadora, Importadora, Accion, Img });
        return res.data;
    }

    static async UPLOAD_IMG_REPUESTO(CodigoImportadora, file){
        let formData = new FormData();
        formData.append("file", file, CodigoImportadora);
        const res = await axios.post(url+ '/upload-img-repuesto', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
        });
        return res.data;
    }

    //PRECIO MERCADO
    static async PRECIOMERCADO(Importadora, CodigoImportadora){
        const res = await axios.post(url+ '/precio-mercado', { Importadora, CodigoImportadora });
        return res.data;
    }

    //API DTE COMPRA
    static async POST_DTE_COMPRA(Emisor, Folio){
        const res = await axios.post(url+ '/post-dte-compra', { Emisor, Folio });
        return res.data;
    }

    //API REFAX
    static async POST_PRODUCTS_REFAX_BY_MARCA(Marca){
        const res = await axios.post(url+ '/product-refax-by-marca', { Marca });
        return res.data;
    }

    static async POST_PRODUCTS_REFAX_BY_MARCA(Marca){
        const res = await axios.post(url+ '/product-refax-by-marca', { Marca });
        return res.data;
    }

    static async GET_MARCA_REFAX(){
        const res = await axios.get(url+ '/get-marcas-refax');
        return res.data;
    }

    static async POST_REFAX_MARKETPLACE(isPublicated, id){
        const res = await axios.post(url+ '/refax-marketplace-publicated', { isPublicated, id });
        return res.data;
    }

    //Imagenes alsacia
    
    static async GET_IMAGENES_ALSACIA(){
        const res = await axios.post(url+'/get-request-imagenes');
        return res.data;
    }

    static async POST_ALSACIA_IMAGENES(ImgUrl, CodigoImportadora){
        const res = await axios.post(url+'/imagenes-alsacia', {ImgUrl, CodigoImportadora});
        return res.data;
    }


    static async GET_REQUEST_IMAGENES_SKIP(CodigoImportadora){
        const res = await axios.post(url+'/get-request-imagenes-skip', {CodigoImportadora: CodigoImportadora});
        return res.data;
    }

}
