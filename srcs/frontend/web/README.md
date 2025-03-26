# Frontend

...

## Características

- ...

## Estructura

```
frontend/
├── /public/
│   ├── favicon.ico
│   └── /assets/
│       └── /images/
│
├── /src/
│   ├── /components/            # Componentes reutilizables
│   │   ├── /ui/                # Componentes de UI básicos (botones, inputs, etc.)
│   │   ├── /layout/            # Componentes de estructura (Header, Footer, etc.)
│   │   └── /common/            # Componentes comunes
│   │
│   ├── /features/              # Componentes organizados por características
│   ├── /contexts/              # Contextos de React
│   ├── /hooks/                 # Custom hooks
│   ├── /pages/                 # Componentes de página completa
│   ├── /services/              # Servicios y lógica de negocio
│   │   ├── /api/               # Funciones para llamadas a API
│   │   └── /utils/             # Funciones utilitarias
│   │
│   ├── /assets/                # Recursos estáticos (SVGs importados como componentes)
│   ├── /types/                 # Definiciones de tipos TypeScript
│   ├── /styles/                # Estilos globales y variables
│   │   └── globals.css         # Estilos globales y configuración de Tailwind
│   │
│   │
│   ├── main.tsx                # Punto de entrada principal
│   ├── App.tsx                 # Componente raíz de la aplicación
│   └── vite-env.d.ts           # Declaraciones de tipos para Vite
│
├── package.json				# Dependencias del proyecto
├── tsconfig.json				# Configuración del compilador TypeScript
├── tailwind.config.js			# Configuración de Tailwind CSS para personalizar temas, plugins, etc.
├── postcss.config.js			# Configuración de PostCSS para procesar CSS (usado por Tailwind)
└── index.html					# # Documento HTML principal donde se monta la aplicación
```
