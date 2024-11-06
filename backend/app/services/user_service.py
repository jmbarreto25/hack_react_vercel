from app.models.users_list import usuarios


# Función para generar un nuevo ID único
def generar_id():
    return max(usuario['id'] for usuario in usuarios) + 1 if usuarios else 1

# Función para crear un nuevo usuario
def create_user(data):
    nuevo_usuario = {
            'id': generar_id(),
            'nombre': data['nombre'],
            'correo': data['correo'],
            'edad': data['edad']
                    }
    usuarios.append(nuevo_usuario)
    return nuevo_usuario, 201
    
# Funcion para buscar un usuario  
def get_user(id):
        usuario = next((u for u in usuarios if u['id'] == id), None)
        if usuario:
            return { 
                  'id': usuario['id'],
                  'nombre': usuario['nombre'],
                  'correo': usuario['correo'],
                  'edad': usuario['edad']
            }
        else:
            return {'error': 'Usuario no encontrado'}, 404

   
# Funcion para actualizar un usuario
def update_user(id, data):
        usuario = next((u for u in usuarios if u['id'] == id), None)
        if usuario:
            
            usuario['nombre'] = data.get('nombre', usuario['nombre'])
            usuario['correo'] = data.get('correo', usuario['correo'])
            usuario['edad'] = data.get('edad', usuario['edad'])
            print("Datos del usuario:", usuario)
            return usuario
        else:
            return {'error': 'Usuario no encontrado'}, 404

# Funcion para borrar un usuario
def delete_user(id):
        global usuarios
        usuarios = [u for u in usuarios if u['id'] != id]
        return '', 204
        

def search_user(params):
        nombre = params.get('nombre', '').strip()
        correo = params.get('correo', '').strip()
        edad = params.get('edad', '').strip()
        resultados = usuarios
        
        if nombre:
            resultados = [u for u in resultados if nombre.lower() in u['nombre'].lower()]
        if correo:
            resultados = [u for u in resultados if correo.lower() in u['correo'].lower()]
        if edad:
            resultados = [u for u in resultados if str(u['edad']) == edad]

        return {'resultados': resultados}

def count_users():
        return {'total_usuarios': len(usuarios)}
    
# Función para obtener todos los usuarios
def get_all_users():
        return [
            {
            'id': usuario['id'],
            'nombre': usuario['nombre'] if len(usuario['nombre']) <= 10 else usuario['nombre'][:10] + '...',
            'correo': usuario['correo'],
            'edad': usuario['edad']
            } 
            for usuario in usuarios]

        