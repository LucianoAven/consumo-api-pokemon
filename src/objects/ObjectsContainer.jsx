import { useState, useEffect } from "react";
import ObjectsView from "./ObjectsView";

const ObjectsContainer = () => {

    const [objects, setObjects] = useState([]);
    const [newObject, setNewObject] = useState({
      name: '',
      features: '',
      price: '',
      year: '',
    })
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activateObjects, setActivateObjects] = useState(false);
    
    const [isEditing, setIsEditing] = useState(false);
    const [editObject, setEditObject] = useState({
      id: '',
      name: '',
      features: '',
      price: '',
      year: '',
    });

    useEffect(() => {
      const existingObjects = JSON.parse(localStorage.getItem('objects')) || [];
      setObjects(existingObjects);
    }, []);

    
  // Solicitud POST
    const addObjects = async () => {
  
      const bodyPost = {
        name: newObject.name,
        data: {
          features: newObject.features,
          price: newObject.price,
          year: newObject.year,  
        }
      }

      try {
      
        const response = await fetch(`https://api.restful-api.dev/objects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },        
          body: JSON.stringify(bodyPost)
        });
    
        if (response.status === 200) {  
          setNewObject({
            name: '',
            features: '',
            price: '',
            year: '',    
          })

          const createdObject = await response.json();
          console.log("Objeto creado")
    
          // Guardar el objeto en el localStorage
          const existingObjects = JSON.parse(localStorage.getItem('objects')) || [];
          const updated = [...existingObjects, createdObject]
  
          localStorage.setItem('objects', JSON.stringify(updated));
  
          // Actualizar el estado con el nuevo objeto
          setObjects(updated);
  
          console.log("Objetos actuales en localStorage:", updated);
  
        } else {
          setError(response.statusText)
        }  
  
      } catch (e) {
        console.log("Error en POST:", e.message);
  
      } finally {
        setLoading(false);
        setActivateObjects(false);  
      }
  
    };
  
    useEffect(() => {
      if (activateObjects) {
        setLoading(true);
        addObjects();  
      }
    }, [activateObjects]);
   
  
    // Solicitud PUT
  
    const startEdit = (object) => {
      setIsEditing(true);
      setEditObject({
        id: object.id,
        name: object.name,
        features: object.data?.features || '',
        price: object.data?.price || '',
        year: object.data?.year || '',
      });
    };
    
    const updateObjects = async (id) => {
  
      try {
  
        const bodyPut = {
          name: editObject.name,
          data: {
            features: editObject.features,
            price: editObject.price,
            year: editObject.year,  
          }
        }
    
        const response = await fetch(`https://api.restful-api.dev/objects/${id}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(bodyPut)
    
        })
  
        if (response.ok) {
          const updatedObject = await response.json();
          console.log('Objeto actualizado en el servidor:', updatedObject);
    
          // Actualizar en localStorage
          const localData = JSON.parse(localStorage.getItem('objects')) || [];
          const newLocalData = localData.map(obj =>
            obj.id === id ? updatedObject : obj
          );
          localStorage.setItem('objects', JSON.stringify(newLocalData));    
          
          setObjects(newLocalData)
  
          alert("Objeto actualizado")
  
          setIsEditing(false);
        } else {
          setError(response.statusText)
        }
  
      } catch (e) {
        console.log("Error al actualizar objeto:", e.message);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    
    // Solicitud DELETE
    const deleteObjects = async (id) => {
  
      try {
  
        const response = await fetch(`https://api.restful-api.dev/objects/${id}`, {
          method: 'DELETE',
        });
    
        if (response.status === 200 || response.status === 204) {
          console.log(`Objeto con ID ${id} eliminado del servidor.`);
  
  
          const localData = JSON.parse(localStorage.getItem('objects')) || [];
  
          const deleteObjects = localData.filter(obj => id !== obj.id)
          localStorage.setItem('objects', JSON.stringify(deleteObjects));
  
          setObjects(deleteObjects);
  
          alert("Objeto eliminado")
  
        } else {
          setError(`Error al eliminar: ${response.statusText}`);
        }  
  
      } catch (e) {
        console.log("Error catch al eliminar:", e.message);
        setError(e.message);
      } finally {
        setLoading(false)
      }
    }

    return (
        <ObjectsView objects={objects} loading={loading} error={error} setActivateObjects={setActivateObjects} startEdit={startEdit} deleteObjects={deleteObjects} newObject={newObject} setNewObject={setNewObject} updateObjects={updateObjects} editObject={editObject} setEditObject={setEditObject} isEditing={isEditing} setIsEditing={setIsEditing} />    
    )

}

export default ObjectsContainer;