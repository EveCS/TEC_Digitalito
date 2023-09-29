class CursoService {
    constructor() {
        this.apiUrl = 'http://localhost:3000/cursos'; // Cambia la URL si tu API está en otro lugar
    }

    async obtenerCursos() {
        const response = await fetch(this.apiUrl);
        const data = await response.json();
        return data;
    }
    
        async obtenerCursoPorId(id) {
            const response = await fetch(`${this.apiUrl}/${id}`);
            const data = await response.json();
            return data;
        }
    
        async crearCurso(curso) {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(curso)
            });
            const data = await response.json();
            return data;
        }
    
        async actualizarCurso(id, curso) {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(curso)
            });
            const data = await response.json();
            return data;
        }
    
        async eliminarCurso(id) {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            return data;
        }
        
}

export default new CursoService();