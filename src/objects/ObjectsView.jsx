const ObjectsView = ({ objects, loading, error, setActivateObjects, startEdit, deleteObjects, newObject, setNewObject, updateObjects, editObject, setEditObject, isEditing, setIsEditing }) => {

    return (
        <div>
        <h1>Lista de Objetos</h1>
        
        {error && <div>Error: {error}</div>}
        
        {loading && <div>Cargando...</div>}
  
        {!loading && !error && objects.length > 0 && (
          <ul>
              <table border="1">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Datos</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>

                  {objects.map((object) => (
                    <tr key={object.id}>
                      <td>{JSON.stringify(object.name)}</td>
                      <td>{JSON.stringify(object.data)}</td>
                      <td>
                        <button onClick={() => deleteObjects(object.id)}>Eliminar</button>
                        <button onClick={() => startEdit(object)}>Modificar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </ul>
        )}
  
        {/* Formulario para agregar un nuevo objeto */}
        <h2>Agregar un Nuevo Objeto</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          setActivateObjects(true)
        }}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={newObject.name}
              onChange={(e) => setNewObject({ ...newObject, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Características:</label>
            <input
              type="text"
              value={newObject.features}
              onChange={(e) => setNewObject({ ...newObject, features: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Precio:</label>
            <input
              type="number"
              value={newObject.price}
              onChange={(e) => setNewObject({ ...newObject, price: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Año:</label>
            <input
              type="number"
              value={newObject.year}
              onChange={(e) => setNewObject({ ...newObject, year: e.target.value })}
              required
            />
          </div>
          <button type='submit'>Agregar Objeto</button>
  
        </form>
        
        {/* Formulario para editar objeto */}      
        {isEditing && (
    <div>
      <h2>Editar Objeto</h2>
  
      <form onSubmit={(e) => {
        e.preventDefault();
        updateObjects(editObject.id);
      }}>
        
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={editObject.name}
            onChange={(e) => setEditObject({ ...editObject, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Características:</label>
          <input
            type="text"
            value={editObject.features}
            onChange={(e) => setEditObject({ ...editObject, features: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            value={editObject.price}
            onChange={(e) => setEditObject({ ...editObject, price: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Año:</label>
          <input
            type="number"
            value={editObject.year}
            onChange={(e) => setEditObject({ ...editObject, year: e.target.value })}
            required
          />
        </div>
        <button type="submit">Guardar Cambios</button>
        <button onClick={() => setIsEditing(false)}>Cancelar</button>
      </form>
    </div>
    )}
  
      </div>        
    )


}

export default ObjectsView;





