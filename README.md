# 📦 Sistema de Pedidos Internos

> Aplicación web para gestionar pedidos de mercadería entre el salón y el depósito.

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

## 🎯 Objetivo

El proyecto busca mejorar la comunicación entre los empleados del salón
y el encargado del depósito, permitiendo gestionar pedidos de mercadería
de manera centralizada.

## 👥 Usuarios

| 👤 Rol | Funciones |
|---|---|
| 🧑‍💼 Empleado | Buscar productos, consultar stock y crear pedidos |
| 📦 Depósito | Recibir, preparar y entregar pedidos |

## 🔄 Flujo de un pedido

```mermaid
    A[🛒 Crear pedido] --> B[⏳ Pendiente]
    B --> C[📦 En preparación]
    C --> D[✅ Preparado]
    D --> E[🚚 Entregado]