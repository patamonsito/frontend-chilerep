
import axios from 'axios';
// axios.defaults.withCredentials = true;

console.log(process.env.NODE_ENV)

const url = process.env.NODE_ENV == 'development' ? '/api' : 'http://143.198.165.86:3000/api'

console.log(url)

export default class API {
    //Login Admin
    static async USER_LOGIN_ADMIN(Usuario, Correo, Contraseña, ip){
        const res = await axios.post(url+ '/user-login_admin', {
            Usuario,
            Correo,
            Contraseña,
            ip
        }, { withCredentials: true });
        return res.data;
    }



    static async GET_USER_TOKEN_ADMIN(ip){
        const res = await axios.post(url+ '/user_token_admin', { ip }, { withCredentials: true });
        return res.data;
    }

    //Session
    static async DELETE_SESSION(){
        const res = await axios.delete(url+ '/delete-session', { withCredentials: true });
        return res.data;
    }

    //Usuarios CRUD
    static async GET_USERS(){
        const res = await axios.get(url+'/users', { withCredentials: true });
        return res.data;
    }
    static async GET_USER_BY_ID(id){
        const res = await axios.get(url+ '/user/' +id, { withCredentials: true });
        return res.data;
    }
    static async CREATE_USER(){
        const res = await axios.post(url+ '/user', { withCredentials: true });
        return res.data;
    }
    static async USER_LOGIN(Correo, Contraseña, ip){
        const res = await axios.post(url+ '/user-login', {
            Correo: Correo,
            Contraseña: Contraseña,
            ip: ip
        }, { withCredentials: true });
        return res.data;
    }
    static async GET_LOGOUT(id){
        const res = await axios.get(url+ '/logout', { withCredentials: true });
        return res.data;
    }

    static async UPDATE_USER(id){
        const res = await axios.patch(url+ '/user/' + id, { withCredentials: true });
        return res.data;
    }
    static async DELETE_USER(id){
        const res = await axios.delete(url+ '/user/' + id, { withCredentials: true });
        return res.data;
    }
    static async BLOCK_USER(id){
        const res = await axios.lock(url+ '/user/' + id, { withCredentials: true });
        return res.data;
    }
    static async UNBLOCK_USER(id){
        const res = await axios.unlock(url+ '/user/' + id, { withCredentials: true });
        return res.data;
    }
    
    static async GET_USER_TOKEN(){
        const res = await axios.post(url+ '/user_token', { withCredentials: true });
        return res.data;
    }
    //PRODUCTOS CRUD

    static async POST_PRODUCTS_CODE(Code){
        const res = await axios.post(url+ '/products-code', { Code }, { withCredentials: true });;
        return res.data;
    }


    static async POST_PRODUCT_SEARCH(CodigoModelo, Descripcion){
        const res = await axios.post(url+ '/products', { CodigoModelo, Descripcion}, { withCredentials: true });;
        return res.data;
    }

    static async POST_LINEA_SEARCH(MarcaVehiculo, Descripcion){
        const res = await axios.post(url+ '/products-linea', { MarcaVehiculo, Descripcion}, { withCredentials: true });;
        return res.data;
    }

    static async GET_PRODUCT_BY_ID(Id){
        const res = await axios.get(url+ '/product/' + Id, { withCredentials: true });;
        return res.data;
    }

    
    static async GET_PRODUCTS_OFF(page){
        const res = await axios.get(url+ '/product-off/' + page, { withCredentials: true });
        return res.data;
    }
  
    static async PRODUCT_CHANGE_DESCRIPCTION(Importadora, CodigoImportadora, OEM, Descripcion) {
        console.log('here')
        const res = await axios.post(url+ '/products-description', { Importadora, CodigoImportadora, OEM, Descripcion }, { withCredentials: true });;
        return res.data;
    }

    static async CATALOGO_EXCEL(Json, Name) {
        const res = await axios.post(url+ '/catalogo-to-excel', { Json, Name }, {responseType: 'blob'}, { withCredentials: true });;
        download(res.data, Name + '.xlsx', { withCredentials: true });
    }

    static async GET_PRODUCTS_BY_MODELOID(CodigoModelo, Page){
        const res = await axios.get(url+ '/products/' + CodigoModelo + '/' + Page, { withCredentials: true });
        return res.data;
    }

        static async POST_CREATEPRODUCTS(Datos, urlRefax = '', urlAlsacia = '', urlBicimoto = ''){
            const res = await axios.post(url+ '/products/create-many', { Datos, urlRefax, urlAlsacia, urlBicimoto }, { withCredentials: true });
            return res.data;
        }

    //MARCAS CRUD
    static async GET_MARCAS(){
        const res = await axios.get(url+ '/marcas', { withCredentials: true });
        return res.data;
    }
    //MODELOS CRUD
    static async GET_MODELS(){
        const res = await axios.get(url+ '/models', { withCredentials: true });
        return res.data;
    }

    static async GET_MODELSBYMARCA(id){
        const res = await axios.get(url+ '/models/' + id, { withCredentials: true });
        return res.data;
    }


    static async POST_COUNT_PRODUCT_BY_MODELS(CodigoModelo){
        const res = await axios.post(url+ '/count-products-by-models', { CodigoModelo }, { withCredentials: true });
        return res.data;
    }

    static async GET_MODEL(id){
        const res = await axios.get(url+ '/model/' + id, { withCredentials: true });
        return res.data;
    }

    static async POST_MODELS_SEARCH(key){
        const res = await axios.post(url+ '/models_search', { key }, { withCredentials: true });
        return res.data;
    }
    //FAMILIAS CRUD
    static async GET_FAMILIES(){
        const res = await axios.get(url+ '/families', { withCredentials: true });
        return res.data;
    }
    //MENU CRUD
    static async GET_MENU(id){
        const res = await axios.get(url+ '/menu_auth/'+id, { withCredentials: true });
        return res.data;
    }
    //SLIDERS CRUD
    static async GET_SLIDERS(){
        const res = await axios.get(url+ '/sliders', { withCredentials: true });
        return res.data;
    }

    //LINEAS CRUD
    static async GET_LINEAS(){
        const res = await axios.get(url+ '/lineas', { withCredentials: true });
        return res.data;
    }

    //carro
    static async ADD_TO_CART(CodigoImportadora, Cantidad, Modelo){
        const res = await axios.post(url+ '/add-cart', { CodigoImportadora, Cantidad, Modelo }, { withCredentials: true });
        return res.data;
    }
    
    static async REMOVE_TO_CART(CodigoImportadora, Cantidad){
        const res = await axios.post(url+ '/remove-cart', { CodigoImportadora, Cantidad }, { withCredentials: true });
        return res.data;
    }


    static async UPDATE_CART(CodigoImportadora, Cantidad){
        const res = await axios.post(url+ '/update-carrito', { CodigoImportadora, Cantidad }, { withCredentials: true });
        return res.data;
    }

    static async GET_CERRITO_SESSION(Id, Cantidad){
        const res = await axios.get(url+ '/get-carrito', { withCredentials: true });
        return res.data;
    }



    static async POST_EMITIR_DOCUMENTO(Documento){

        if(Documento.TipoDocumento == 'Cotización'){
            const res = await axios.post(url+ '/emitir-documento', { Documento }, {responseType: 'blob'}, { withCredentials: true });
                return download(res.data, 'Cotizacion_' + Documento.Nombres.replaceAll(' ', '_') +  Documento.Apellidos.replaceAll(' ', '_') + '.pdf', { withCredentials: true });
        }else{
            const res = await axios.post(url+ '/emitir-documento', { Documento }, { withCredentials: true });
            return res.data;
        }

    }

    static async GET_CLIENT(Rut){
        const res = await axios.get(url+ '/get-client/' + Rut, { withCredentials: true });
        return res.data;
    }
    static async GET_REGIONES(){
        const res = await axios.get(url+ '/get-regiones', { withCredentials: true });
        return res.data;
    }

    static async POST_COMUNA(Region){
        const res = await axios.post(url+ '/post-comuna', { Region }, { withCredentials: true });
        return res.data;
    }

    //ordenes
    static async POST_SAVEORDEN(Json){
        const res = await axios.post(url+ '/guardar-orden', { Json } , { withCredentials: true });
        return res.data;
    }

    static async POST_ORDEN(Token){
        const res = await axios.post(url+ '/orden', { Token } , { withCredentials: true });
        return res.data;
    }

    //Libro Compra
    static async GET_DOCUMENTOS(){
        const res = await axios.get(url+ '/obtener-documentos', { withCredentials: true });
        return res.data;
    }

    static async POST_DOCUMENTO(Documento){
        const res = await axios.post(url+ '/obtener-documento', { Documento } , { withCredentials: true });
        return res.data;
    }


    static async POST_DOCUMENTOS(dateFilter){
        const res = await axios.post(url+ '/obtener-documentos', { dateFilter } , { withCredentials: true });
        return res.data;
    }
    

    //API IMPORTADORA
    static async POST_API_IMPORTADORA(Buscar){
        const res = await axios.post(url+ '/products/api-importadora', { Buscar } , { withCredentials: true });
        return res.data;
    }

    static async POST_API_REFAX(Buscar){
        const res = await axios.post(url+ '/api-refax', { Buscar } , { withCredentials: true });
        return res.data;
    }
    
    static async POST_API_BICIMOTO(Buscar){
        const res = await axios.post(url+ '/api-bicimoto', { Buscar } , { withCredentials: true });
        return res.data;
    }
    static async POST_API_MANNHEIM(Buscar){
        const res = await axios.post(url+ '/api-mannheim', { Buscar } , { withCredentials: true });
        return res.data;
    }
    static async POST_API_ALSACIA(Buscar){
        const res = await axios.post(url+ '/api-alsacia', { Buscar } , { withCredentials: true });
        return res.data;
    }
    static async POST_API_NORIEGA(Buscar){
        const res = await axios.post(url+ '/api-noriega', { Buscar } , { withCredentials: true });
        return res.data;
    }
  
    static async POST_API_CUATRORUEDAS(Buscar){
        const res = await axios.post(url+ '/api-cuatro-ruedas', { Buscar }, { withCredentials: true });
        return res.data;

    }

    //API IMPORTADORA
    static async POST_REFAX_AUTH(){
        const res = await axios.post(url+ '/auth-refax', { withCredentials: true });
        return res.data;
    }


    static async POST_BICIMOTO_AUTH(){
        const res = await axios.post(url+ '/auth-bicimoto', { withCredentials: true });
        return res.data;
    }

    static async POST_NORIEGA_AUTH(){
        const res = await axios.post(url+ '/auth-noriega', { withCredentials: true });
        return res.data;
    }




    static async POST_APLICACIONESM(Aplicacion){
        const res = await axios.post(url+ '/aplicaciones-m', { Aplicacion } , { withCredentials: true });
        return res.data;
    }

    //NOTA DE CREDITO
    static async POST_NOTACREDITO(Documento){
        const res = await axios.post(url+ '/realizar-nota-credito', { Documento } , { withCredentials: true });
        return res.data;
    }

    //PROVEEDORES
    static async GET_PROVEEDORES(){
        const res = await axios.get(url+ '/get-proveedores', { withCredentials: true });
        return res.data;
    }
    static async GET_PROVEEDOR(Id){
        const res = await axios.get(url+ '/get-proveedor/' + Id , { withCredentials: true });
        return res.data;
    }

    static async CREAR_PROVEEDOR(Json){
        const res = await axios.post(url+ '/crear-proveedor', Json , { withCredentials: true });
        return res.data;
    }

    static async UPDATE_PROVEEDOR(Json){
        const res = await axios.post(url+ '/update-proveedor', Json , { withCredentials: true });
        return res.data;
    }

    static async ELIMINAR_PROVEEDOR(rut){
        const res = await axios.delete(url+ '/delete-proveedor/' + rut , { withCredentials: true });
        return res.data;
    }


    //BODEGAS
    static async GET_BODEGAS(){
        const res = await axios.get(url+ '/get-bodegas', { withCredentials: true });
        return res.data;
    }
    static async GET_BODEGA(Id){
        const res = await axios.get(url+ '/get-bodega/' + Id , { withCredentials: true });
        return res.data;
    }
    
    static async CREAR_BODEGA(Json){
        const res = await axios.post(url+ '/crear-bodega', Json , { withCredentials: true });
        return res.data;
    }

    static async UPDATE_BODEGA(Json){
        const res = await axios.post(url+ '/update-bodega', Json , { withCredentials: true });
        return res.data;
    }

    static async ELIMINAR_BODEGA(Bodega){
        const res = await axios.delete(url+ '/delete-bodega/' + Bodega , { withCredentials: true });
        return res.data;
    }


    //WMS REGISTROS
    static async GET_REGISTROS(){
        const res = await axios.get(url+ '/get-registros', { withCredentials: true });
        return res.data;
    }
    
    static async GET_REGISTRO(Id){
        const res = await axios.get(url+ '/get-registro/' + Id , { withCredentials: true });
        return res.data;
    }
    
    static async CREAR_REGISTRO(Json){
        const res = await axios.post(url+ '/crear-registro', Json , { withCredentials: true });
        return res.data;
    }

    static async UPDATE_REGISTRO(Json){
        const res = await axios.post(url+ '/update-registro', Json , { withCredentials: true });
        return res.data;
    }

    static async ELIMINAR_REGISTRO(id){
        const res = await axios.delete(url+ '/delete-registro/' + id , { withCredentials: true });
        return res.data;
    }

    //SUCURSALES
    static async GET_SUCURSALES(){
        const res = await axios.get(url+ '/get-sucursales', { withCredentials: true });
        return res.data;
    }
    static async GET_SUCURSAL(Id){
        const res = await axios.get(url+ '/get-sucursal/' + Id , { withCredentials: true });
        return res.data;
    }
    
    static async CREAR_SUCURSAL(Json){
        const res = await axios.post(url+ '/crear-sucursal', Json , { withCredentials: true });
        return res.data;
    }

    static async UPDATE_SUCURSAL(Json){
        const res = await axios.post(url+ '/update-sucursal', Json , { withCredentials: true });
        return res.data;
    }

    static async ELIMINAR_SUCURSAL(id){
        const res = await axios.delete(url+ '/delete-sucursal/' + id , { withCredentials: true });
        return res.data;
    }



    //WebpayPlus POST_WEBPAY

    static async POST_WEBPAY(){
        const res = await axios.post(url+ '/start-webpay' , { withCredentials: true });
        return res.data;
    }

    static async POST_RETRY_WEBPAY(Json){
        const res = await axios.post(url+ '/restart-webpay', { Json } , { withCredentials: true });
        return res.data;
    }

    //VALIDAR RUT

    static async POST_RUTEMPRESA(Rut){
        const res = await axios.post(url+ '/validar-rut', { Rut }, { withCredentials: true });
        return res.data;
    }

    static async PRODUCT_MARKETPLACE(Importadora, CodigoImportadora, OEM, Marketplace){
        const res = await axios.post(url+ '/product-marketplace', { Importadora, CodigoImportadora, OEM, Marketplace }, { withCredentials: true });
        return res.data;
    }
    
    //POST CREATE LINK

    static async POST_CREATELINK(Importadora, CodigoModelo, Url){
        const res = await axios.post(url+ '/create-link', { Importadora, CodigoModelo, Url }, { withCredentials: true });
        return res.data;
    }


    static async IMG_CONTROLLER(CodigoImportadora, OEM, Importadora, Accion, Img){
        const res = await axios.post(url+ '/img-controller', { CodigoImportadora, Importadora, Accion, Img }, { withCredentials: true });
        return res.data;
    }

    static async UPLOAD_IMG_REPUESTO(CodigoImportadora, file){
        let formData = new FormData();
        formData.append("file", file, CodigoImportadora, { withCredentials: true });
        const res = await axios.post(url+ '/upload-img-repuesto', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
        }, { withCredentials: true });
        return res.data;
    }

    //PRECIO MERCADO
    static async PRECIOMERCADO(Importadora, CodigoImportadora){
        const res = await axios.post(url+ '/precio-mercado', { Importadora, CodigoImportadora }, { withCredentials: true });
        return res.data;
    }

    //API DTE COMPRA
    static async POST_DTE_COMPRA(Emisor, Folio){
        const res = await axios.post(url+ '/post-dte-compra', { Emisor, Folio }, { withCredentials: true });
        return res.data;
    }

}
