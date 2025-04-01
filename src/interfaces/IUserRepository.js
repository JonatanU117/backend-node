export default class IUserRepository {
    /*
    Crear Usuario
    @param {Object} Usuario
    @returns {Promise<Object>} Usuario Creado
    */
   async create(user) {
    throw new Error('Metodo no implementado');
   }
   async update(id, user) {
    throw new Error('Metodo no implementado');
   }
   async delete(id) {
    throw new Error('Metodo no implementado');
   }
   async getAll() {
    throw new Error('Metodo no implementado');
   }
   async findByFullName(nombre, apaterno, amaterno) {
    throw new Error('Metodo no implementado');
   }
   async findByUser(username) {
    throw new Error('Metodo no implementado');
   }
   async findByRol(rol) {
    throw new Error('Metodo no implementado');
   }
}