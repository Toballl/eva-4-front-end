import React, { useState } from 'react';

interface Employee {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  sexo: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<Employee>({
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    sexo: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const newEmployee = { ...formData, id: Date.now() };
    localStorage.setItem('employees', JSON.stringify([...employees, newEmployee]));
    setFormData({ id: 0, nombre: '', apellido: '', email: '', telefono: '', sexo: '' });
    alert('Empleado agregado con éxito');
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form" id="contactForm">
      <h2>Formulario de Contacto</h2>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        type="text"
        name="apellido"
        value={formData.apellido}
        onChange={handleChange}
        placeholder="Apellido"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="tel"
        name="telefono"
        value={formData.telefono}
        onChange={handleChange}
        placeholder="Teléfono"
        required
      />
      <div>
        <label>
          <input
            type="radio"
            name="sexo"
            value="Masculino"
            checked={formData.sexo === 'Masculino'}
            onChange={handleChange}
            required
          />
          Masculino
        </label>
        <label>
          <input
            type="radio"
            name="sexo"
            value="Femenino"
            checked={formData.sexo === 'Femenino'}
            onChange={handleChange}
            required
          />
          Femenino
        </label>
      </div>
      <button type="submit" >Agregar Empleado</button>
    </form>
  );
};

export default ContactForm;