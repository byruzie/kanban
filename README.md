# 📝 Kanban - React + Vite

Este é um projeto de **Kanban** feito com **React + Vite**, com suporte a:

- ✅ Criação e Edição de tarefas
- 📦 Armazenamento persistente com `localStorage`
- 🧲 Drag-and-drop com `@dnd-kit`
- 🧠 Organização por status (Pending, In Progress, Completed)
- ⏱️ Contador de tempo gasto nas tarefas concluídas
- 🌐 Deploy via GitHub Pages

![kanban-preview](./public/kanban.png) <!-- opcional, se quiser colocar uma imagem -->

---

## 🚀 Deploy

Acesse o projeto online:  
👉 [https://byruzie.github.io/kanban/](https://byruzie.github.io/kanban/)

---

## 🧰 Tecnologias usadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [@dnd-kit](https://docs.dndkit.com/)
- [TailwindCSS](https://tailwindcss.com/) *(ou classes utilitárias customizadas)*
- `localStorage` para persistência de dados
- `gh-pages` para deploy

---

## 🧠 Aprendizados

- Componentização: O projeto é dividido em componentes reutilizáveis (`KanbanCard`, `KanbanBoard`, etc), seguindo boas práticas de arquitetura React.
- Estado global com React: controlar o estado com `useState` e a compartilhá-lo entre componentes através do "lifting state up".
- Hooks: uso do `useState` para controlar dados e inputs e do `useEffect` para sincronizar o estado com o `localStorage` e reagir a mudanças.
- Integração com bibliotecas externas: Uso do `@dnd-kit/core` para implementar drag-and-drop com React. Personalização de sensores e overlays para uma UX fluida.
- Persistência com `localStorage`: salvar os dados localmente para manter o estado mesmo após atualizar a página.
- Deploy de SPA com Vite no GitHub Pages.
- Manipulação de datas, formatação e controle de formulário: Como capturar inputs, formatar valores e validar campos em tempo real com estados controlados.

---

## 🙋‍♂️ Autor

Desenvolvido por Raul Cardoso